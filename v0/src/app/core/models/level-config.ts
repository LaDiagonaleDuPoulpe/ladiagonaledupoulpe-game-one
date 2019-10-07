import { SceneKey } from "../../shared/constants/scene-key";
import { Level } from "./level";

/**
 * Configuration of one scene
 */
export class LevelConfig {
    //#region fields
    private _level: Level;
    private _data: any;
    //#endregion

    constructor(level: Level) {
        this.level = level;
    }

    //#region properties
    /**
     * Gets level to display
     */
    public get level(): Level {
        return this._level;
    } 

    /**
     * Sets level to display
     */
    public set level(value: Level) {
        this._level = value;
    }

    /**
     * Gets data from json file
     */
    public get data(): string {
        return this._data;
    } 

    /**
     * Sets data from json file
     */
    public set data(value: string) {
        this._data = value;
    }
    //#endregion
}