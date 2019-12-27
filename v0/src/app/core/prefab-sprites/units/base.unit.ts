import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { basename } from 'path';
import { AnimationsCreator } from '../animations/animations-creator';

/**
 * Defines default unit 
 * Unit is prefab with spritesheet animation
 */
export abstract class BaseUnit extends PrefabSprite {
    //#region fields
    private startingAnimationKey: string;
    //#endregion

    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);
    }

    //#region protected methods
    protected initialize() {
        super.initialize();

        this.prepareAnimations(this.properties);

        if (this.startingAnimationKey) {
            this.anims.play(this.startingAnimationKey);
        }
    }
    //#endregion

    //#region internal methods
    private prepareAnimations(properties: PropertiesSetting) {
       // const animationKeys = 
    }
    //#endregion
}