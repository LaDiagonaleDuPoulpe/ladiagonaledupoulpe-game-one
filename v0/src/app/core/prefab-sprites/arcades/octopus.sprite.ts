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
    constructor(protected _scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        protected _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);    
    }

    //#region public methods
    update() {
        
    }
    //#endregion

    //#region Internal methods
    protected initialize(properties: PropertiesSetting) {
        super.initialize(properties);

        const animationKeys = this._animationsCreator.createAll(this, this._scene, properties);

        if (animationKeys && animationKeys.length > 0) {
            const idleKey = animationKeys.find(item => item.endsWith('idle'));
            this.anims.play(idleKey);
        }
    }
    //#endregion

    //#region properties
    //#endregion
}