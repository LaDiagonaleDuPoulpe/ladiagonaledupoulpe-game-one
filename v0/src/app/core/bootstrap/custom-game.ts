import "phaser";
import { injectable, container } from 'tsyringe';

import { Config } from "../config/config";
import { DefaultLogger } from "../../shared/services/default-logger";
import { BootScene } from "../scenes/boot-scene";
import { loadavg } from "os";
import { LoadingScene } from '../scenes/loading-scene';
import { SceneConfig } from '../models/scene-config';


const BOOT_SCENE_KEY = 'BootScene';
const LOAD_SCENE_KEY = 'LoadingScene';

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
        this.scene.add(LOAD_SCENE_KEY, this._loadingScene);
        this.scene.add(BOOT_SCENE_KEY, this._bootScene);
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

        const config = new SceneConfig('title');
        this.scene.start(BOOT_SCENE_KEY, config);
    }
    //#endregion
}