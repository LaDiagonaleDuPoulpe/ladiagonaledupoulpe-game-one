import { injectable } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelConfig } from '../models/level-config';

/**
* Loads all assets of the game scene
* (assets are inside the json)
*/
@injectable()
export class LoadingScene extends BaseScene {
    //#region fields
    private _levelConfig: LevelConfig;
    //#endregion

    constructor(protected _logger: DefaultLogger) {
        super(LoadingScene.name, _logger);
    }

    //#region internal methods

    //#endregion

    //#region public methods
    create(config: LevelConfig) {
        this._logger.log('create', config);

        this.scene.start(config.level.sceneName, config);
    }

    preload() {
        this._logger.log('preload');
        this.prepareAssets();
    }

    init(config: LevelConfig) {
        this._levelConfig = config;

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
        this.prepareImagesToBeLoaded();
    }

    private prepareImagesToBeLoaded() {
        this._logger.log('loadImages', this._levelConfig.data);

        this._levelConfig.data.assets.images.forEach((image) => {
            this.load.image(image.key, image.url);
        }, this);
    }
    //#endregion
}