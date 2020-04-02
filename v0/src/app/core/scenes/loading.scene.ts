import { injectable } from 'tsyringe';

import { BaseScene } from './base.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelConfig } from '../models/levels/level-config';
import { Level } from '../models/levels/level';
import { SceneType } from '../../shared/enums/scene-type';
import { SceneData } from '../models/scenes/scene-data';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { AssetImage } from '../models/assets/asset-image';
import { GameManagerService } from '../../shared/services/game-manager.service';

/**
* Loads all assets of the game scene
* (assets are inside the json)
*/
@injectable()
export class LoadingScene extends BaseScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService,
                protected _gameDataManager: GameManagerService) {
        super(LoadingScene.name, _logger, _levelManageService, _gameDataManager);
    }

    //#region internal methods
    //#endregion

    //#region public methods
    create(config: LevelConfig) {
        this._logger.log('create', config);

        if (config && config.level) {
            this.scene.start(config.level.sceneName, config);
        }
    }
    
    preload() {
        this._logger.log('preload');
        this.prepareAssets();
    }

    init(config: LevelConfig) {
        this.levelConfig = config;

        const levelData = this.cache.json.get(config.nextLevelToLoadByKey);
        this.levelConfig.data = <SceneData> levelData;

        let message = this.add.text(window.innerWidth / 2, window.innerHeight / 2,
            "Chargement du niveau",
            {
                font: "48px " + this.levelConfig.sceneConfiguration.font,
                fill: this.levelConfig.sceneConfiguration.foreColor
            });
    }
    //#endregion

    //#region internal methods
    private prepareAssets() {
        if (this.levelConfig && this.levelConfig.data) {
            this.prepareImagesToBeLoaded();
            this.prepareVideosToBeLoaded();
            this.prepareAtlases();
            this.prepareSpriteSheets();
            this.prepareTileMaps();
        }
    }

    private prepareSpriteSheets() {
        this._logger.log('prepareSpriteSheets', this.levelConfig.data);
        
        if (this.levelConfig.data.assets.spritesheets) {
            this.levelConfig.data.assets.spritesheets.forEach(spritesheet => {
                this.load.spritesheet(spritesheet.key, spritesheet.url, {
                    frameWidth: spritesheet.frame.dimension.width,
                    frameHeight: spritesheet.frame.dimension.height,
                    spacing: spritesheet.frame.spacing,
                    margin: spritesheet.frame.margin
                });
            }, this);
        }
    }

    private prepareAtlases() {
        this._logger.log('prepareAtlases', this.levelConfig.data);

        if (this.levelConfig.data.assets.atlases) {
            this.levelConfig.data.assets.atlases.forEach(atlas => {
                this.load.multiatlas(atlas.key, atlas.url);
            }, this);
        }
    }
    
    private prepareTileMaps() {
        this._logger.log('prepareTileMaps', this.levelConfig.data);
        
        if (this.levelConfig.data.assets.tilemaps) {
            this.levelConfig.data.assets.tilemaps.forEach(tilemap =>{
                this.load.tilemapTiledJSON(tilemap.key, tilemap.url);
            }, this);
        }
    }

    private prepareImagesToBeLoaded() {
        if (this.levelConfig.data.assets.images) {
            this.levelConfig.data.assets.images.forEach((asset) => {
                this.load.image(asset.key, asset.url);
            }, this);
        }
    }    

    private prepareVideosToBeLoaded() {
        if (this.levelConfig.data.assets.videos) {
            this.levelConfig.data.assets.videos.forEach((asset) => {
                this.load.video(asset.key, asset.url);
            }, this);
        }
    }    
    //#endregion
}