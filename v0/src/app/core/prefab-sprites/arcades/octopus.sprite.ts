import { BaseArcadeSprite } from './base-arcade.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { AnimationsCreator } from '../animations/animations-creator';
import { GameDataManagerService } from '../../../shared/services/game-data-manager.service';
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
        this._currentAction = ActionType.walk;
        this._currentPosition = DirectionType.left;

        if (this._isAlive) {
            this.setPositionAndCurrentAction();
        } else if (! this._isStopped) {
            this._currentAction = ActionType.diying;
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

    /**
     * Moves the octopus to the right, until player stop to press right key
     */
    moveRight() {
        this.currentDirection.right = true;
    }

    /**
     * Moves the octopus to the left, until player stop to press right key
     */
    moveLeft() {
        this.currentDirection.left = true;
    }

    /**
     * Moves the octopus to the up, until player stop to press right key
     */
    moveUp() {
        this.currentDirection.up = true;
    }
    
    /**
     * Moves the octopus to the down, until player stop to press right key
     */
    moveDown() {
        this.currentDirection.down = true;
    }
    
    /** The current sprite is in collision with other sprite */
    hitFromCollision() {
        this.setTint(0xFF3300);
        this.scene.time.addEvent({
            delay: 500,
            callback: () => { this.clearTint() },
            callbackScope: this,
            loop: false
        });
    }
    //#endregion
    
    //#region Internal methods
    private attachEvents() {
        this.on('animationcomplete', this.completeAnimation, this);
    }

    private completeAnimation(anim) {
        if (this._currentAction == ActionType.diying) {
            this._isStopped = true;            
            this.off('animationcomplete', this.completeAnimation);
            
            this.scene.time.addEvent({
                delay: 1000,
                callback: () => { this.callSceneEndOfDying(); },
                callbackScope: this,
                loop: false
            });
        }
    }

    private callSceneEndOfDying() {
        (<BaseLevelScene> this.scene).emitEndOfDyingEvent();
    }

    private setPositionAndCurrentAction() {
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