import { AssetImage } from "./asset-image";
import { AssetsData } from "./assets-data";
import { Prefab } from "./prefab";

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
    //#endregion
}