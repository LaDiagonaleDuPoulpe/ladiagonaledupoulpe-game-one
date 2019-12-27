import { PrefabSprite } from "./prefab.sprite";
import { BaseLevelScene } from "../scenes/base-level.scene";
import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { PrefabType } from "../../shared/enums/prefab-type";
import { BackgroundPrefabSprite } from "./background-prefab.sprite";
import { TextPrefabSprite } from "./text-prefab.sprite";
import { ClickableImagePrefabSprite } from './clickable-image-prefab.sprite';
import { ClickableTextPrefabSprite } from './clickable-text-prefab.sprite';
import { VideoSprite } from './video.sprite';
import { CloudSprite } from './arcades/cloud.sprite';
import { StaticImageSprite } from './static-image.sprite';
import { DefaultArcadeSprite } from './arcades/default-arcade.sprite';
import { StaticUnit } from './units/static.unit';
import { WaveUnit } from './units/wave.unit';
import { OctopusSprite } from './arcades/octopus.sprite';
import { AnimationsCreator } from './animations/animations-creator';

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
                        properties: PropertiesSetting,
                        _animationsCreator: AnimationsCreator): any {

        let sprite = null;

        /**
         * TODO: see to generic create item
         */
        switch(type) {
            case PrefabType.background: {
                sprite = new BackgroundPrefabSprite(scene, name, position, properties, _animationsCreator);
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

            case PrefabType.video: {
                sprite = new VideoSprite(scene, name, position, properties);
            } break;

            case PrefabType.cloud: {
                sprite = new CloudSprite(scene, name, position, properties);
            } break;

            case PrefabType.static: {
                sprite = new StaticImageSprite(scene, name, position, properties);
            } break;

            case PrefabType.default: {
                sprite = new DefaultArcadeSprite(scene, name, position, properties);
            } break;

            case PrefabType.animated: {
                sprite = new StaticUnit(scene, name, position, properties, _animationsCreator);
            } break;

            case PrefabType.wave: {
                sprite = new WaveUnit(scene, name, position, properties, _animationsCreator);
            } break;

            case PrefabType.octopus: {
                sprite = new OctopusSprite(scene, name, position, properties);
            } break;
        }

        return sprite;
    }
    //#endregion
}