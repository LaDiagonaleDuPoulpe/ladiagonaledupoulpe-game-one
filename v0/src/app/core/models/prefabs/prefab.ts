import { PrefabType } from "../../../shared/enums/prefab-type";
import { Position } from "../position";
import { PropertiesSetting } from "../properties-setting";
import { BaseObject } from '../base-object';
import { BasePrefab } from './base-prefab';

/**
 * Base class to manage prefab to load in game
 */
export class Prefab extends BasePrefab {
    //#region fields
    /**
     * If true, this is a prefab the user can move
     */
    public playable: boolean;    
    //#endregion
}