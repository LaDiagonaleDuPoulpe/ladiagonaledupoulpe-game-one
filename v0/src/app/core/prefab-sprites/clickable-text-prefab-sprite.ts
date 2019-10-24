import { BaseLevelScene } from "../scenes/base-level-scene";
import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { TextPrefabSprite } from "./text-prefab-sprite";

/**
 * Sprite prefab to display text, and to be clickable
 */
export class ClickableTextPrefabSprite extends TextPrefabSprite {
    constructor(_scene: BaseLevelScene,
                _name: string,
                _position: Position,
                _properties: PropertiesSetting) {
        super(_scene, _name, _position, _properties);

        this.initialize();
    }
    
    //#region properties
    private initialize() {
        this.setInteractive();
        this.on("pointerdown", () => {
            this._scene.goToNextScene();
        });
    }
    //#endregion
}