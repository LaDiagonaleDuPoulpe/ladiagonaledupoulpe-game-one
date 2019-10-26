import { AssetImage } from "./asset-image";
import { AssetTileMap } from './asset-tile-map';
import { AssetSpriteSheet } from './asset-spritesheet';

/**
 * Represents all assets in scene data
 */
export class AssetsData {
    //#region fields
    /**
     * List of images to be loaded in current scene
     */
    public images: AssetImage[];

    /**
     * List of videos to be loaded in current scene
     */
    public videos: AssetImage[];

    /**
     * List of map to be loaded in current scene
     */
    public tilemaps: AssetTileMap[];

    /**
     * List of sprite sheets to be loaded in current scene
     */
    public spritesheets: AssetSpriteSheet[];
    //#endregion
}