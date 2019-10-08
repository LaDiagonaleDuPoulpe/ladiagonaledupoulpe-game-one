import { PrefabType } from "../../shared/enums/prefab-type";
import { Position } from "./position";
import { PropertiesSetting } from "./properties-setting";

/**
 * Base class to manage prefab to load in game
 */
export class Prefab {
    //#region fields
    public key: string;
    public type: PrefabType;
    public position: Position;
    public properties: PropertiesSetting;
    //#endregion
}