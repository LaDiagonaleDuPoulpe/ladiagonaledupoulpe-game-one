import { AssetImage } from "../assets/asset-image";
import { AssetsData } from "../assets/assets-data";
import { Prefab } from "../prefab";
import { AssetMap } from '../assets/asset-map';
import { EllipseLight } from '../stage/ellipse-light';

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
     * Lights in the current stage
     */
    public stageItems: EllipseLight[];

    /**
     * Map to load in current scene
     */
    public map: AssetMap;
    //#endregion
}