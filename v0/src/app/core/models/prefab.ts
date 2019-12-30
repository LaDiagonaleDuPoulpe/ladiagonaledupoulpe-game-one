import { PrefabType } from "../../shared/enums/prefab-type";
import { Position } from "./position";
import { PropertiesSetting } from "./properties-setting";

/**
 * Base class to manage prefab to load in game
 */
export class Prefab {
    //#region fields
    /**
     * Key to find the prefab
     */
    public key: string;

    /**
     * Type of the prefab
     */
    public type: PrefabType;

    /**
     * If true, this is a prefab the user can move
     */
    public playable: boolean;

    /**
     * Position x, y of the prefab
     */
    public position: Position;

    /**
     * Adding configuration of the prefab
     */
    public properties: PropertiesSetting;
    //#endregion
}