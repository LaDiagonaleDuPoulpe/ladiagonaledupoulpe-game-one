import { Asset } from "./asset";
import { AssetFrame } from './asset-frame';

/**
 * Spritesheet in assets list
 */
export class AssetSpriteSheet extends Asset {
    //#region fields
    /**
     * Dimensions of the frame
     */
    public frameSetting: AssetFrame;
    //#endregion
}