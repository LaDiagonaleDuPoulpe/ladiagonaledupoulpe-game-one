import { injectable } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelConfig } from '../models/level-config';
import { Level } from '../models/level';
import { SceneType } from '../../shared/enums/scene-type';
import { SceneData } from '../models/scene-data';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { AssetImage } from '../models/asset-image';

/**
* Loads all assets of the game scene
* (assets are inside the json)
*/
@injectable()
export class LoadingScene extends BaseScene {
    //#region fields
    private _levelConfig: LevelConfig;
    //#endregion

    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService) {
        super(LoadingScene.name, _logger);
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
        this._levelConfig = config;

        const levelData = this.cache.json.get(config.nextLevelToLoadByKey);
        this._levelConfig.data = <SceneData> levelData;

        let message = this.add.text(window.innerWidth / 2, window.innerHeight / 2,
            "Chargement du niveau",
            {
                font: "48px " + this._levelConfig.sceneConfiguration.font,
                fill: this._levelConfig.sceneConfiguration.foreColor
            });
    }
    //#endregion

    //#region internal methods
    private prepareAssets() {
        if (this._levelConfig && this._levelConfig.data) {
            this.prepareImagesToBeLoaded();
            this.prepareVideosToBeLoaded();
            this.prepareSpriteSheets();
            this.prepareTileMaps();
        }
    }

    private prepareSpriteSheets() {
        this._logger.log('prepareSpriteSheets', this._levelConfig.data);
        
        if (this._levelConfig.data.assets.spritesheets) {
            this._levelConfig.data.assets.spritesheets.forEach(spritesheet => {
                this.load.spritesheet(spritesheet.key, spritesheet.url, {
                    frameWidth: spritesheet.frameSetting.dimension.width,
                    frameHeight: spritesheet.frameSetting.dimension.height,
                    spacing: spritesheet.frameSetting.spacing,
                    margin: spritesheet.frameSetting.margin
                });
            }, this);
        }
    }
    
    private prepareTileMaps() {
        this._logger.log('prepareTileMaps', this._levelConfig.data);
        
        if (this._levelConfig.data.assets.tilemaps) {
            this._levelConfig.data.assets.tilemaps.forEach(tilemap =>{
                this.load.tilemapTiledJSON(tilemap.key, tilemap.url);
            }, this);
        }
    }

    private prepareImagesToBeLoaded() {
        this._levelConfig.data.assets.images.forEach((asset) => {
            this.load.image(asset.key, asset.url);
        }, this);
    }    

    private prepareVideosToBeLoaded() {
        this._levelConfig.data.assets.videos.forEach((asset) => {
            this.load.video(asset.key, asset.url);
        }, this);
    }    

    private prepareAssetsWithUrl(assets: AssetImage[], loader: Function) {
        this._logger.log('prepareImagesToBeLoaded', this._levelConfig.data);

        assets.forEach((asset) => {
            loader(asset.key, asset.url);
        }, this);
    }
    //#endregion
}