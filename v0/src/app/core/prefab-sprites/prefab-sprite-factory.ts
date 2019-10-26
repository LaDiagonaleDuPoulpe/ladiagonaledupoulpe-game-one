import { PrefabSprite } from "./prefab.sprite";
import { BaseLevelScene } from "../scenes/base-level-scene";
import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { PrefabType } from "../../shared/enums/prefab-type";
import { BackgroundPrefabSprite } from "./background-prefab.sprite";
import { TextPrefabSprite } from "./text-prefab.sprite";
import { ClickableImagePrefabSprite } from './clickable-image-prefab.sprite';
import { ClickableTextPrefabSprite } from './clickable-text-prefab.sprite';

/**
 * Factory to create custom sprite prefab
 */
export class PrefabSpriteFactory {
    //#region public methods
    /**
     * Creates one instance of the sprite
     * @param type type of the sprite
     */
    public static create(type: PrefabType, 
                        scene: BaseLevelScene, 
                        name: string, 
                        position: Position, 
                        properties: PropertiesSetting): any {

        let sprite = null;

        /**
         * TODO: see to generic create item
         */
        switch(type) {
            case PrefabType.background: {
                sprite = new BackgroundPrefabSprite(scene, name, position, properties);
            } break;

            case PrefabType.text: {
                sprite = new TextPrefabSprite(scene, name, position, properties);
            } break;

            case PrefabType.buttonImage: {
                sprite = new ClickableImagePrefabSprite(scene, name, position, properties);
            } break;

            case PrefabType.clickableText: {
                sprite = new ClickableTextPrefabSprite(scene, name, position, properties);
            } break;
        }

        return sprite;
    }
    //#endregion
}