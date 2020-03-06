import { injectable } from 'tsyringe';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { BaseScene } from './base.scene';
import GameData from '../models/game/game-data';
import { LevelConfig } from '../models/levels/level-config';
import { GameDataManagerService } from '../../shared/services/game-data-manager.service';

/** First scene of the game
* It loads all global data of the scene
* Verify rights of the game, ...
*/
@injectable()
export default class PreloadFirstScene extends BaseScene {
    //#region Fields
    //#endregion
    
    constructor(protected _logger: DefaultLogger, 
                protected _levelManager: LevelManageService,
                protected _gameDataManager: GameDataManagerService) {
        super(PreloadFirstScene.name, _logger, _levelManager, _gameDataManager);
    }
        
    //#region Public methods
    preload() {
        super.preload();        
        this.gameDataManager.load();
    }
    
    init(config: LevelConfig) {
        super.init(config);
        this.displayWaitingMessage();
    }
    
    create() {
        var timer = this.time.delayedCall(1500, () => { this.goToNextScene(); }, null, this);
    }
    //#endregion
    
    //#region Internal methods
    private displayWaitingMessage() {
        let message = this.add.text((window.innerWidth / 2) - 100, window.innerHeight / 2,
            "Initialisation du jeu",
            {
                font: "90px " + this.levelConfig.sceneConfiguration.font,
                fill: this.levelConfig.sceneConfiguration.foreColor
            });
    }
    //#endregion
    
    //#region Properties
    //#endregion
} 