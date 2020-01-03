import { BaseLevelScene } from "../scenes/base-level.scene";
import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";

/**
 * Sprite prefab to display text
 */
export class TextPrefabSprite extends Phaser.GameObjects.Text {
    constructor(protected _scene: BaseLevelScene,
        private _name: string,
        private _position: Position,
        private _properties: Partial<PropertiesSetting>) {
        super(_scene, _position.x, _position.y, _properties.text, null);

        this.style.setFont(this._properties.style.font);
        this.style.setFill(this._properties.style.fill);

        if (this._properties.depth) {
            this.setDepth(this._properties.depth);
        }

        this._scene.add.existing(this);
    }

    //#region properties
    /**
     * Gets properties setting
     */
    protected get properties(): Partial<PropertiesSetting> {
        return this._properties;
    }
    //#endregion
}