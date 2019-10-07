import { injectable } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelConfig } from '../models/level-config';

/**
* Loads all assets of the game
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
        this._levelConfig = config;
    }

    init() {
        let message = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 
                                    "Chargement du niveau", 
                                    { 
                                        font: "48px Kells", 
                                        fill: "#ffffff" 
                                    });
    }
    //#endregion
}