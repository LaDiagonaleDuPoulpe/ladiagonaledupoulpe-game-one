import { BaseLevelScene } from "../scenes/base-level-scene";
import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { TextPrefabSprite } from "./text-prefab.sprite";
import { posix } from "path";

/**
 * Sprite prefab to display image, this sprite is clickable
 * https://github.com/jestarray/gate/blob/master/src/scenes/MenuScene.ts
 * https://snowbillr.github.io/blog//2018-07-03-buttons-in-phaser-3/
 */
export class ClickableImagePrefabSprite extends Phaser.GameObjects.Image {
    constructor(private _scene: BaseLevelScene,
                _name: string,
                private _position: Position,
                private _properties: PropertiesSetting) {
        super(_scene, _position.x, _position.y, _properties.texture);
        
        this.initialize();
    }
    
    //#region internal methods
    private initialize() {
        this.attachEvents();

        this.scaleX = this._properties.scale.x;
        this.scaleY = this._properties.scale.y;

        this.setInteractive();
    }

    private attachEvents() {
        this.on("pointerdown", () => {
            this._scene.goToNextScene();
        });
    }
    //#endregion
}