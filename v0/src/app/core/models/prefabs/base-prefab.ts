import { PrefabType } from '../../../shared/enums/prefab-type';
import { BaseObject } from '../base-object';
import { Position } from '../position';
import { PropertiesSetting } from '../properties-setting';

/**
* It represents prefab item
* with basic properties
* It is not usable, you have to create a child class
*/
export abstract class BasePrefab extends BaseObject {
    //#region Fields
    /**
    * Type of the prefab
    */
    public type: PrefabType;

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