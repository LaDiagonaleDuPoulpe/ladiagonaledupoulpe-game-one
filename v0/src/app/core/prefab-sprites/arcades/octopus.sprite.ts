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


        console.log('>> octopus :: position', _position);
    }

    //#region public methods
    update() {
        const firstPartAnimKey = this._name + '_';
        const firstPartAnimWalkKey = firstPartAnimKey + 'walk';
        let wholeAnimKey = firstPartAnimWalkKey;

        if (this._scene.cursors.left.isDown) {
            this.setVelocityX(-160);
            
            wholeAnimKey += '-left';
        }
        else if (this._scene.cursors.right.isDown) {
            this.setVelocityX(160);
            
            wholeAnimKey += '-right';
        }
        else if (this._scene.cursors.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-160);
            
            wholeAnimKey += '-up';
        }
        else if (this._scene.cursors.down.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(160);
            
            wholeAnimKey += '-down';
        }
        else {
    
            const currentAnimationKey = this.anims.currentAnim.key;
            const parts = currentAnimationKey.split('-');
    
            this.setVelocityX(0);
            this.setVelocityY(0);
            
            wholeAnimKey = firstPartAnimKey + 'idle' + '-' + parts[1];
        }
        
        this.anims.play(wholeAnimKey, true);
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