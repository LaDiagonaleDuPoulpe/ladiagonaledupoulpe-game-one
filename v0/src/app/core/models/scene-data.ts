import { AssetImage } from "./assets/asset-image";
import { AssetsData } from "./assets/assets-data";
import { Prefab } from "./prefab";
import { AssetMap } from './assets/asset-map';

/**
 * Data of the scene
 */
export class SceneData {
    //#region fields
    /**
     * Assets to be preloaded, before used in prefab loader
     */
    public assets: AssetsData;

    /**
     * Collision group list
     */
    public groups: string[]; 

    /**
     * Prefabs list of one scene
     */
    public prefabs: Prefab[];

    /**
     * Map to load in current scene
     */
    public map: AssetMap;
    //#endregion
}