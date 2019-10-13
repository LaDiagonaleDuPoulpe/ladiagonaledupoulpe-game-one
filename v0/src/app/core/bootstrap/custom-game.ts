import "phaser";
import { map } from 'rxjs/operators';
import { injectable } from 'tsyringe';

import { SceneType } from "../../shared/enums/scene-type";
import { DefaultLogger } from "../../shared/services/default-logger";
import { SceneConfigService } from "../../shared/services/scene-config.service";
import { GameConfig } from "../config/game-config";
import { Level } from "../models/level";
import { LevelConfig } from '../models/level-config';
import { SceneConfig } from "../models/scene-config";
import { MainScene } from "../scenes/main-scene";
import { LoadingScene } from '../scenes/loading-scene';
import { TitleScene } from "../scenes/title-scene";
import { LevelService } from '../../shared/services/level.service';
import { LevelManageService } from '../../shared/services/level-manager.service';


/**
 * Starting game : all you need to start the game : config, events
 */
@injectable()
export class CustomGame extends Phaser.Game {
    //#region fields
    private _sceneConfig: SceneConfig;
    private _levels: Level[];
    //#endregion

    constructor(config: GameConfig, 
                private _sceneConfigService: SceneConfigService,
                private _levelService: LevelService,
                private _logger: DefaultLogger,
                private _bootScene: MainScene,
                private _loadingScene: LoadingScene,
                private _titleScene: TitleScene) {
        super(config.forRoot());

        this.init();
    }

    //#region internal methods
    /**
     * initialize all data, adding scenes
     */
    private init() {
        this.scene.add(SceneType.loading, this._loadingScene);
        this.scene.add(SceneType.title, this._titleScene);
        this.scene.add(SceneType.boot, this._bootScene);

        this.loadConfigurations();
    }

    private loadConfigurations() {
        this._sceneConfigService.loadDefault().subscribe(config => this._sceneConfig = config);
    }
    //#endregion

    //#region public methods
    preload() {
        this._logger.log('game', 'preload');
    }

    boot() {
        //this.logger.log('boot'); // not run : boot event here is calling before constructor and so on, before dependency injection        
        super.boot();
    }

    start() {
        this._logger.log('starting');
        super.start();

        const config = new LevelConfig();
        config.sceneConfiguration = this._sceneConfig;

        this.scene.start(SceneType.main, config);
    }
    //#endregion

    //#region internal methods
    //#endregion

    //#region properties
    //#endregion
}