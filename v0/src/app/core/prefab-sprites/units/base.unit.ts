import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { basename } from 'path';

/**
 * Defines default unit 
 * Unit is prefab with spritesheet animation
 */
export abstract class BaseUnit extends PrefabSprite {
    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting) {
        super(_scene, _name, _position, _properties);
    }

    //#region protected methods
    protected initialize() {
        super.initialize();

        this.prepareAnimations(this.name, this.properties);
    }
    //#endregion

    //#region internal methods
    private prepareAnimations(name: string, properties: PropertiesSetting) {
        
    }

    private createAnimation(animationName, spriteName: string, properties: PropertiesSetting) {

    }
    //#endregion
}