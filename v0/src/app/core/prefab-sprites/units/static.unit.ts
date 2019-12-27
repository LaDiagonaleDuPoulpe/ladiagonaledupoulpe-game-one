import { BaseUnit } from './base.unit';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { AnimationsCreator } from '../animations/animations-creator';

/**
 * Animated sprite will not move
 */
export class StaticUnit extends BaseUnit {
    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);
    }
}