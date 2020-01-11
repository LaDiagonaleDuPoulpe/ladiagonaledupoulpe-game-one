import { AssetImage } from "../assets/asset-image";
import { AssetsData } from "../assets/assets-data";
import { Prefab } from "../prefab";
import { AssetMap } from '../assets/asset-map';
import { EllipseLight } from '../stage/ellipse-light';
import { PropertiesSetting } from '../properties-setting';
import { SceneConfigurationPropertiesSetting } from '../scene-configuration-properties-setting';
import { ModalContent } from '../dialog-modal/modal-content';

/**
 * Data of the scene
 */
export class SceneData {
    //#region fields
    /**
     * Default configuration of the current scene
     * Configure default text style, color, ...
     */
    public defaultConfiguration: SceneConfigurationPropertiesSetting;

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

    /**
     * Container about all messages to display in the scene
     */
    public messagesContent: ModalContent;
    //#endregion
}