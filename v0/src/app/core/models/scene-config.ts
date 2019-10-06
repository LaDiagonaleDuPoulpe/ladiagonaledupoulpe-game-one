/**
 * Configuration of one scene
 */
export class SceneConfig {
    //#region fields
    private _sceneKey: string;
    //#endregion

    constructor(key: string) {
        this.sceneKey = key;
    }

    //#region properties
    /**
     * Gets scene key
     */
    public get sceneKey(): string {
        return this._sceneKey;
    } 

    /**
     * Sets scene key
     */
    public set sceneKey(value: string) {
        this._sceneKey = value;
    }
    //#endregion
}