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
    private _currentPosition = '';
    private _currentAction = '';
    private _isAlive = true;
    private _isStopped = false;
    private _isReborn = false;
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
        this._currentPosition = DirectionType.left;

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
            let wholeAnimKey = `${firstPartAnimKey}_${this._currentAction}-${this._currentPosition}`;
            const animation = this.anims.play(wholeAnimKey, true);        
        }
    }

    /** Current player is dying : playing the dying animation */
    die() {
        this._isAlive = false;
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

        if (this._scene.cursors.left.isDown) {
            this.setVelocityX(-160);
            
            this._currentPosition = DirectionType.left;
        }
        else if (this._scene.cursors.right.isDown) {
            this.setVelocityX(160);
            
            this._currentPosition = DirectionType.right;
        }
        else if (this._scene.cursors.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-160);
            
            this._currentPosition = DirectionType.up;
        }
        else if (this._scene.cursors.down.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(160);
            
            this._currentPosition = DirectionType.down;
        }
        else {
            
            const currentAnimationKey = this.anims.currentAnim.key;
            const parts = currentAnimationKey.split('-');
            
            this.setVelocityX(0);
            this.setVelocityY(0);
            
            this._currentPosition = parts[1];
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
    
    private reinitDirections() {
        for (const key in this.currentDirection) {
            if (this.currentDirection.hasOwnProperty(key)) {
                this.currentDirection[key] = false;
            }
        }
    }
    //#endregion

    //#region properties
    //#endregion
}