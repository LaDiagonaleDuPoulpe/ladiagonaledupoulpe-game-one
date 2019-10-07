import { SceneKey } from "../../shared/constants/scene-key";
import { Level } from "./level";
import { SceneConfig } from "./scene-config";

/**
 * Configuration of one scene
 */
export class LevelConfig {
    //#region fields
    private _level: Level;
    private _data: any;
    private _sceneConfig: SceneConfig;
    //#endregion

    constructor(level: Level) {
        this.level = level;
    }

    //#region properties
    /**
     * Gets scene configuration
     */
    public get sceneConfiguration(): SceneConfig {
        return this._sceneConfig;
    }

    /**
     * Sets scene configuration
     */
    public set sceneConfiguration(value: SceneConfig) {
        this._sceneConfig = value;
    }

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