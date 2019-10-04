import "phaser";
import { injectable, container } from 'tsyringe';

import { Config } from "../config/config";
import { DefaultLogger } from "../services/default-logger";
import { BootScene } from "../scenes/boot-scene";


const BOOT_SCENE_KEY = 'BootScene';

/**
 * Starting game : all you need to start the game : config, events
 */
@injectable()
export class CustomGame extends Phaser.Game {
    constructor(config: Config, private logger: DefaultLogger,
        private bootScene: BootScene) {
        super(config.forRoot());

        this.init();
    }

    //#region internal methods
    /**
     * initialize all data, adding scenes
     */
    private init() {
        this.scene.add(BOOT_SCENE_KEY, this.bootScene);
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

        this.scene.start(BOOT_SCENE_KEY, { scene: 'title' });
    }
    //#endregion
}