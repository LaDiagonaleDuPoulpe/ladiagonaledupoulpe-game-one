import "phaser";
import { injectable, container } from 'tsyringe';

import { Config } from "../config/config";
import { DefaultLogger } from "../../shared/services/default-logger";
import { BootScene } from "../scenes/boot-scene";
import { loadavg } from "os";
import { LoadingScene } from '../scenes/loading-scene';
import { LevelConfig } from '../models/level-config';
import { SceneKey } from "../../shared/constants/scene-key";
import { Level } from "../models/level";

/**
 * Starting game : all you need to start the game : config, events
 */
@injectable()
export class CustomGame extends Phaser.Game {
    constructor(config: Config, 
                private logger: DefaultLogger,
                private _bootScene: BootScene,
                private _loadingScene: LoadingScene) {
        super(config.forRoot());

        this.init();
    }

    //#region internal methods
    /**
     * initialize all data, adding scenes
     */
    private init() {
        this.scene.add(SceneKey.loading, this._loadingScene);
        this.scene.add(SceneKey.boot, this._bootScene);

    }
    //#endregion

    //#region public methods
    boot() {
        //this.logger.log('boot'); // not run : boot event here is calling before constructor and so on, before dependency injection        
        super.boot();
    }

    start() {
        this.logger.log('starting');
        super.start();

        const config = new LevelConfig(new Level('title'));
        this.scene.start(SceneKey.boot, config);
    }
    //#endregion
}