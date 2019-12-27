import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { BaseArcadeSprite } from '../arcades/base-arcade.sprite';
import { BaseUnit } from './base.unit';
import { AnimationsCreator } from '../animations/animations-creator';

/**
 * It represents wave in the sea
 */
export class WaveUnit extends BaseUnit {
    //#region Fields
    private _nbTurn = 0;
    //#endregion

    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting,
        _animationsCreator: AnimationsCreator) {
        super(_scene, _name, _position, _properties, _animationsCreator);

        this.on('animationcomplete', this.completeAnimation, this);
    }

    //#region public methods
    update() {
        this.x = this.x + 3; 
    }
    //#endregion

    //#region Internal methods
    private completeAnimation() {
        this.destroy();
    }
    //#endregion
}