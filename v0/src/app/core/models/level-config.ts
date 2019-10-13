import { SceneType } from "../../shared/enums/scene-type";
import { Level } from "./level";
import { SceneConfig } from "./scene-config";
import { SceneData } from "./scene-data";

/**
 * Configuration of one scene
 */
export class LevelConfig {
    //#region fields
    private _nextLevelToLoadByKey: string;
    private _level: Level;
    private _levels: Level[];
    private _data: SceneData;
    private _sceneConfig: SceneConfig;
    //#endregion

    constructor(level?: Level) {
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
     * Sets all levels
     */
    public set levels(value: Level[]) {
        this._levels = value;
    }

    /**
     * Gets all levels
     */
    public get levels(): Level[] {
        return this._levels;
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
    public get data(): SceneData {
        return this._data;
    }

    /**
     * Sets data from json file
     */
    public set data(value: SceneData) {
        this._data = value;
    }

    /**
     * Gets next key of next level to load in game
     */
    public get nextLevelToLoadByKey(): string {
        return this._nextLevelToLoadByKey;
    }

    /**
     * Sets next key of next level to load in game
     */
    public set nextLevelToLoadByKey(value: string) {
        this._nextLevelToLoadByKey = value;
    }
    //#endregion
}