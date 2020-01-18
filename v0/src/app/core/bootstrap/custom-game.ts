import "phaser";
import { map } from 'rxjs/operators';
import { injectable } from 'tsyringe';

import { SceneType } from "../../shared/enums/scene-type";
import { DefaultLogger } from "../../shared/services/default-logger";
import { SceneConfigService } from "../../shared/services/scene-config.service";
import { GameConfig } from "../config/game-config";
import { Level } from "../models/levels/level";
import { LevelConfig } from '../models/levels/level-config';
import { SceneConfig } from "../models/scenes/scene-config";
import { MainScene } from "../scenes/main.scene";
import { LoadingScene } from '../scenes/loading.scene';
import { TitleScene } from "../scenes/title.scene";
import { LevelService } from '../../shared/services/level.service';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { MapScene } from '../scenes/map.scene';
import { VideoScene } from '../scenes/video.scene';
import { InsideSpaceShipMapScene } from '../scenes/inside-space-ship-map.scene';
import ColliderManagerService from '../../shared/services/collider-manager.service';


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
                private _colliderManagerService: ColliderManagerService,
                private _levelService: LevelService,
                private _logger: DefaultLogger,
                private _mainScene: MainScene,
                private _loadingScene: LoadingScene,
                private _titleScene: TitleScene,
                private _videoScene: VideoScene,
                private _mapScene: MapScene,
                private _insideSPaceShipScene: InsideSpaceShipMapScene) {
        super(config.forRoot());

        this.init();
    }

    //#region internal methods
    /**
     * initialize all data, adding scenes
     */
    private init() {
        this.addScenes();
        this.loadConfigurations();
        this.attachEvents();
    }
    
    private addScenes() {
        this.scene.add(SceneType.map, this._mapScene);
        this.scene.add(SceneType.insideSpaceShipMap, this._insideSPaceShipScene);
        this.scene.add(SceneType.loading, this._loadingScene);
        this.scene.add(SceneType.title, this._titleScene);
        this.scene.add(SceneType.video, this._videoScene);
        this.scene.add(SceneType.main, this._mainScene);
    }

    private loadConfigurations() {
        this._sceneConfigService.loadDefault().subscribe(config => this._sceneConfig = config);
    }
    
    private attachEvents() {
        this.scale.on('resize', this.resize, this);
        this.input.mouse.capture = true;
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

        this.scale.resize(window.innerWidth, window.innerHeight);
    }

    /**
     * Resize game
     */
    resize(gameSize, baseSize, displaySize, resolution) {
        
        this._logger.log('resize', gameSize);
        // //this.scale.resize(window.innerWidth, window.innerHeight);
        // this.scale.refresh();
    }
    //#endregion

    //#region internal methods
    //#endregion

    //#region properties
    //#endregion
}