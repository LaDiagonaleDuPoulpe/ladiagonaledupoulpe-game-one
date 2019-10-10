import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { BaseLevelScene } from "../scenes/base-level-scene";

/**
 * Sprite adding in scene : could be image or animated image
 */
export abstract class PrefabSprite extends Phaser.GameObjects.Sprite {
    constructor(private _scene: BaseLevelScene, 
                private _name: string, 
                private _position: Position, 
                private _properties: PropertiesSetting) {
        super(_scene, _position.x, _position.y, _properties.texture, _properties.frame);

        this.initialize();
    }

    //#region internal methods
    private initialize() {
        if (this._properties.anchor) {
            this.setOrigin(this._properties.anchor.x, this._properties.anchor.y);
        }

        if (this._properties.scale) {
            this.setScale(this._properties.scale.x, this._properties.scale.y);
        }
    }
    //#endregion
}