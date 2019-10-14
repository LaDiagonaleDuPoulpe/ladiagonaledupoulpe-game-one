/**
 * Base class of all assets to load in game
 */
export abstract class Asset {
    //#region fields
    /**
     * Key of the asset
     */
    public key: string;

    /**
     * Url to load the asset
     */
    public url: string;
    //#endregion
}