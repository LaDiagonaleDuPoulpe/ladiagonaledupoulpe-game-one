import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { BaseArcadeSprite } from './base-arcade.sprite';
import { BaseUnit } from '../units/base.unit';

/**
 * It represents wave in the sea
 */
export class WaveSprite extends BaseUnit {
    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting) {
        super(_scene, _name, _position, _properties);
    }

    //#region public methods
    update() {

    }
    //#endregion
}