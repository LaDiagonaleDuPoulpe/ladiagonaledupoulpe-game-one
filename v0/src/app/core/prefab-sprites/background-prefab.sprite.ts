import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { BaseLevelScene } from "../scenes/base-level.scene";
import { PrefabSprite } from "./prefab.sprite";
import { AnimationsCreator } from './animations/animations-creator';

/**
 * Background sprite
 */
export class BackgroundPrefabSprite extends PrefabSprite {
    constructor(_scene: BaseLevelScene, 
                _name: string, 
                _position: Position, 
                _properties: PropertiesSetting,
                _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);
    }
}