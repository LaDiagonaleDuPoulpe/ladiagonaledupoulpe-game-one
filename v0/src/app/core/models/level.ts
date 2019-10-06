export class Level {
    //#region fields
    private _key: string;
    private _sceneName: string;
    //#endregion

    constructor(key: string, sceneName: string) {
        this.key = key;
        this.sceneName = sceneName;
    }

    //#region properties
    /**
     * Gets key value
     */
    public get key(): string {
        return this._key;
    }

    /**
     * Sets key value
     */
    public set key(value: string) {
        this._key = value;
    }

    /**
     * Gets scene value
     */
    public get sceneName(): string {
        return this._sceneName;
    }

    /**
     * Sets scene value
     */
    public set sceneName(value: string) {
        this._sceneName = value;
    }

    public get path(): string {
        return `assets/levels/level-${this.key}.json`;
    }
    //#endregion
}