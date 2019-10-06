export class Level {
    //#region fields
    private _key: string;
    private _scene: string;
    //#endregion

    constructor(key: string, scene: string) {
        this.key = key;
        this.scene = scene;
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
    public get scene(): string {
        return this._scene;
    }

    /**
     * Sets scene value
     */
    public set scene(value: string) {
        this._scene = value;
    }

    public get path(): string {
        return `assets/levels/level-${this.key}.json`;
    }
    //#endregion
}