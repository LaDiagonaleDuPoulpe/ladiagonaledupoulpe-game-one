import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';

/**
 * It reprsents a cloud in scene
 */
export class CloudSprite extends PrefabSprite {
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

    //#region properties
    public get defaultDepth(): number {
        return 0;
    }
    //#endregion
}