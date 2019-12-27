import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { BaseArcadeSprite } from './base-arcade.sprite';
import { AnimationsCreator } from '../animations/animations-creator';

/**
 * It represents a cloud in scene
 */
export class CloudSprite extends BaseArcadeSprite {
    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);    
    }

    //#region public methods
    //#endregion

    //#region properties
    //#endregion
}