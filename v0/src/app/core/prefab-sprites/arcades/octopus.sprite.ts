import { BaseArcadeSprite } from './base-arcade.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { AnimationsCreator } from '../animations/animations-creator';

/**
 * It represents one moving octopus
 * Octopus can move up, down, left and right
 */
export class OctopusSprite extends BaseArcadeSprite {
    //#region Fields
    private _animationKeys: string[];
    //#endregion

    constructor(protected _scene: BaseLevelScene, 
        protected _name: string, 
        _position: Position, 
        protected _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);   
        
        
    }

    //#region public methods
    update() {

        if (this.currentDirection.up && this.body.velocity.y <= 0) {
            this.setVelocityY(-100);
            if (this.body.velocity.x === 0) {
                this.anims.play(this._name + '_' + 'walk-up', true);
            }
        } else if (this.currentDirection.down && this.body.velocity.y >= 0) {
            this.setVelocityY(100);
            if (this.body.velocity.x === 0) {
                this.anims.play(this._name + '_' + 'walk-down', true);
            }
        } else {
            this.setVelocityY(0);
        }
        
        if (this.currentDirection.right && this.body.velocity.x >= 0) {   
            this.setVelocityX(100);
            if (this.body.velocity.y === 0) {         
                this.anims.play(this._name + '_' + 'walk-right', true);
            }
        } 
        else if (this.currentDirection.left && this.body.velocity.x <= 0) {  
            this.setVelocityX(-100);
            if (this.body.velocity.y === 0) {           
                this.anims.play(this._name + '_' + 'walk-left', true);
            }
        } else {
            this.setVelocityX(0);
        }

        this.reinitDirections();
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.stopCurrentAnimation();
        }
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
    //#endregion

    //#region Internal methods
    protected initialize(properties: PropertiesSetting) {
        super.initialize(properties);

        this._animationKeys = this._animationsCreator.createAll(this, this._scene, properties);

        if (this._animationKeys && this._animationKeys.length > 0) {
            const idleKey = this._animationKeys.find(item => item.includes('idle'));
            this.anims.play(idleKey);
        }
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