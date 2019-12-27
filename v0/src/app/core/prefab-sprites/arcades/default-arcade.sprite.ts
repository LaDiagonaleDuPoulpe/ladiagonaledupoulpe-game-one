import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { BaseArcadeSprite } from './base-arcade.sprite';

/**
 * It represents the default arcade sprite
 */
export class DefaultArcadeSprite extends BaseArcadeSprite {
    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting) {
        super(_scene, _name, _position, _properties);    
    }

    //#region public methods
    //#endregion

    //#region properties
    //#endregion
}