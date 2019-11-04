import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';

/**
 * It reprsents a cloud in scene
 */
export class CloudSprite extends Phaser.Physics.Arcade.Sprite {
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

        this._speed = Phaser.Math.Between(10, 100);

        
        _scene.add.existing(this);
    }

    //#region public methods
    update() {        
        this.setVelocityX(this._speed);
    }
    //#endregion

    //#region properties
    //#endregion
}