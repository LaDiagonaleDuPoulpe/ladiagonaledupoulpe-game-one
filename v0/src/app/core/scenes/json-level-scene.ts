import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseScene } from "./base-scene";
import { LevelConfig } from "../models/level-config";

/**
 * Json level scene : abstract class of all active map scenes
 */
export abstract class JsonLevelScene extends BaseScene {
    //#region fields
    private _levelConfig: LevelConfig;
    //#endregion

    constructor(key: string, protected _logger: DefaultLogger) {
        super(key, _logger);
    }

    //#region public methods
    create() {
        this.add.text(0, 0, 'yeahhh');
    }

    update() {

    }

    init(config: LevelConfig) {
        this._levelConfig = config;


    }
    //#endregion
}