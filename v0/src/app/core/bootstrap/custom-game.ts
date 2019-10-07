import "phaser";
import { injectable, container } from 'tsyringe';

import { GameConfig } from "../config/game-config";
import { DefaultLogger } from "../../shared/services/default-logger";
import { BootScene } from "../scenes/boot-scene";
import { loadavg } from "os";
import { LoadingScene } from '../scenes/loading-scene';
import { LevelConfig } from '../models/level-config';
import { SceneKey } from "../../shared/constants/scene-key";
import { Level } from "../models/level";
import { SceneConfigService } from "../../shared/services/scene-config.service";
import { SceneConfig } from "../models/scene-config";

/**
 * Starting game : all you need to start the game : config, events
 */
@injectable()
export class CustomGame extends Phaser.Game {
    //#region fields
    private _sceneConfig: SceneConfig;
    //#endregion

    constructor(config: GameConfig, 
                private _sceneConfigService: SceneConfigService,
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

        this.loadConfigurations();
    }

    private loadConfigurations() {
        this._sceneConfigService.loadDefault().subscribe(config => this._sceneConfig = config);
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