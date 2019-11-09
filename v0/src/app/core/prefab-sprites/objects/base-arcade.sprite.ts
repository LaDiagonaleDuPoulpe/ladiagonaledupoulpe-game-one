import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';

/**
 * It represents the parent arcade sprite
 */
export abstract class BaseArcadeSprite extends Phaser.Physics.Arcade.Sprite {
    //#region fields
    private _speed: number;
    //#endregion

    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting) {
        super(_scene, _position.x, _position.y, _properties.texture);        

        if (_properties.depth) {
            this.setDepth(_properties.depth);
        }

        this.speed = Phaser.Math.Between(10, 100);
        
        _scene.add.existing(this);
    }

    //#region public methods
    update() {
        let isDestroy = false;        
        
        if (this.x > window.innerWidth + 80) {
            this.visible = false;
            this.destroy();
            isDestroy = true;
        }

        if (! isDestroy) {
            this.setVelocityX(this.speed);
        }
    }
    //#endregion

    //#region properties
    /**
     * Speed of the sprite
     */
    protected get speed(): number {
        return this._speed;
    }

    /**
     * Sets the speed of the sprite
     */
    protected set speed(value: number) {
        this._speed = value;
    }
    //#endregion
}