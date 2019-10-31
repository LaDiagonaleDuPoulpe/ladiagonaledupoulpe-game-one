/**
 * Config of each scene
 */
export class SceneConfig {
    //#region fields
    private _font: string;
    private _foreColor: string
    //#endregion

    //#region properties
    /**
     * Gets font value
     */
    public get font(): string {
        return this._font;
    }

    /**
     * Sets font value
     */
    public set font(value: string) {
        this._font = value;
    }

    /**
     * Gets fore color value
     */
    public get foreColor(): string {
        return this._foreColor;
    }

    /**
     * Sets fore color value
     */
    public set foreColor(value: string) {
        this._foreColor = value;
    }
    //#endregion
}