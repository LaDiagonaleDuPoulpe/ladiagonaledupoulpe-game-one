import { BaseObject } from '../base-object';

/**
 * Base class of all assets to load in game
 */
export abstract class Asset extends BaseObject {
    //#region fields
    /**
     * Url to load the asset
     */
    public url: string;
    //#endregion
}