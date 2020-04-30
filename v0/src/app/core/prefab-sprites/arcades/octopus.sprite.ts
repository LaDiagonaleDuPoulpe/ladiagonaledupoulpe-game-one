import { BaseArcadeSprite } from './base-arcade.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { AnimationsCreator } from '../animations/animations-creator';
import { ActionType } from '../../../shared/enums/action-type';
import { DirectionType } from '../../../shared/enums/direction-type';

/**
 * It represents one moving octopus
 * Octopus can move up, down, left and right
 */
export class OctopusSprite extends BaseArcadeSprite {
    //#region Fields
    private _animationKeys: string[];
    private _currentDirection = '';
    private _currentAction = '';
    private _isAlive = true;
    private _isStopped = false;
    private _isReborn = false;
    private _stepValue = 160;
    //#endregion

    constructor(protected _scene: BaseLevelScene, 
        protected _name: string, 
        _position: Position, 
        protected _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator); 

        this.attachEvents();
    }
    
    //#region public methods
    update() {
        const firstPartAnimKey = this._name;
        this._currentDirection = DirectionType.left;

        if (! this._isStopped) {
            if (this._isAlive) {
                this.setPositionAndCurrentAction();
            } else if(this._isReborn) {
                this._currentAction = ActionType.reborn;
            } else {
                this._currentAction = ActionType.diying;
            }
        }
        
        if (! this._isStopped) {
            let wholeAnimKey = `${firstPartAnimKey}_${this._currentAction}-${this._currentDirection}`;
            const animation = this.anims.play(wholeAnimKey, true);        
        }
    }

    /** Avoids collision by moving outside object from collision */
    avoidCollision() {
        const action = 'move';
        let direction = ''; 

        switch (this._currentDirection) {
            case DirectionType.down:
                direction = DirectionType.up;
                break;

            case DirectionType.up:
                direction = DirectionType.down;
                break;

            case DirectionType.left:
                direction = DirectionType.right;
                break;

            case DirectionType.right:
                direction = DirectionType.left;
                break;
        }

        this[action + direction[0].toUpperCase() + direction.substring(1)]();
    }

    /** Current player is dying : playing the dying animation */
    die() {
        this._isAlive = false;
        this.stopMoving();
    }

    /** Current player is reborn : playing the reborn animation */
    reborn() {
        this._isStopped = false;
        this._isReborn = true;
    }

    /** Calls it after reborn animation */
    reinit() {
        this._isReborn = false;
        this._isAlive = true;
        this._isStopped = false;
        this.allowMoving();
    }
    
    /** The current sprite is in collision with other sprite */
    hitFromCollision() {
        if (! this._isReborn) {
            this.setTint(0xFF3300);
            this.scene.time.addEvent({
                delay: 500,
                callback: () => { this.clearTint() },
                callbackScope: this,
                loop: false
            });
        }
    }

    moveRight() {
        this.setVelocityX(this._stepValue);            
        this._currentDirection = DirectionType.right;
    }

    moveLeft() {
        this.setVelocityX(- this._stepValue);            
        this._currentDirection = DirectionType.left;
    }

    moveUp() {
        this.setVelocityY(- this._stepValue);        
        this._currentDirection = DirectionType.up;
    }

    moveDown() {
        this.setVelocityY(this._stepValue);        
        this._currentDirection = DirectionType.down;
    }
    //#endregion
    
    //#region Internal methods
    private attachEvents() {
        this.on('animationcomplete', this.completeAnimation, this);
    }

    private completeAnimation(anim) {
        let action = null;

        if (this._currentAction == ActionType.diying) {
            action = this.completeDyingAction;
        }

        if (this._currentAction == ActionType.reborn) {
            action = this.completeRebornAction;
        }

        if (action) {
            action.call(this);
        }
    }

    private completeRebornAction() {
        this.completeAction(this.callSceneEndOfReborn, 2300);
    }

    private completeDyingAction() {
        this.completeAction(this.callSceneEndOfDying);
    }

    private callSceneEndOfDying() {
        (<BaseLevelScene> this.scene).emitEndOfDyingEvent();
    }

    private callSceneEndOfReborn() {
        (<BaseLevelScene> this.scene).emitEndOfRebornEvent();
    }

    private completeAction(callback, duration: number = 1000) {
        this._isStopped = true;            
        
        this.scene.time.addEvent({
            delay: duration,
            callback: callback,
            callbackScope: this,
            loop: false
        });
    }

    private setPositionAndCurrentAction() {
        this._currentAction = ActionType.walk;
        let isMoving = false;

        if (this._scene.cursors.left.isDown) {
            isMoving = true;
            this.moveLeft();
        }
        else if (this._scene.cursors.right.isDown) {
            isMoving = true;
            this.moveRight();
        }
        
        if (this._scene.cursors.up.isDown) {
            isMoving = true;
            this.moveUp();
        }
        else if (this._scene.cursors.down.isDown) {
            isMoving = true;
            this.moveDown();
        }
        
        if (! isMoving) {            
            const currentAnimationKey = this.anims.currentAnim.key;
            const parts = currentAnimationKey.split('-');
            
            this.setVelocityX(0);
            this.setVelocityY(0);
            
            this._currentDirection = parts[1];
            this._currentAction = ActionType.idle;
        }
    }

    protected initialize(properties: PropertiesSetting) {
        super.initialize(properties);

        this._animationKeys = this._animationsCreator.createAll(this, this._scene, properties);

        if (this._animationKeys && this._animationKeys.length > 0) {
            const idleKey = this._animationKeys.find(item => item.includes(ActionType.idle));
            this.anims.play(idleKey);
        }

        this.setPipeline('Light2D');

        this.setAsCollisionObject();
    }

    private setAsCollisionObject() {
        this.setCollideWorldBounds(true);
        this._scene.applyBuildingsCollisionDetection(this);
    }

    private stopCurrentAnimation() {
        this.anims.stop();        
    }
    //#endregion

    //#region properties
    //#endregion
}