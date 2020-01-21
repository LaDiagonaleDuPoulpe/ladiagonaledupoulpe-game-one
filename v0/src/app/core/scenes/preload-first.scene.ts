import { injectable } from 'tsyringe';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { BaseScene } from './base.scene';
import GameData from '../models/game/game-data';
import { LevelConfig } from '../models/levels/level-config';

/** First scene of the game
* It loads all global data of the scene
* Verify rights of the game, ...
*/
@injectable()
export default class PreloadFirstScene extends BaseScene {
    //#region Fields
    private _gameData: GameData;
    private  _globalDataKey = 'default-global-data';
    //#endregion
    
    constructor(protected _logger: DefaultLogger, 
                protected _levelManager: LevelManageService) {
        super(PreloadFirstScene.name, _logger, _levelManager);
    }
        
    //#region Public methods
    preload() {
        this._logger.log('firstScene::preload');
        
        this.loadGameData();
    }
    
    init(config: LevelConfig) {
        super.init(config);
        this.displayWaitingMessage();
    }
    
    create() {
        this._logger.log('firstScene::create');
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

            this.cameras.main.setBackgroundColor(Phaser.Display.Color.GetColor(67, 31, 17));
    }
        
    private loadGameData() {
        if (! this.gameData) {
            this.load.json(this._globalDataKey, 'assets/global/global-settings.json');
        }    
    }
    
    private setGameData() {
        if (! this.gameData) {
            this._gameData = this.cache.json.get(this._globalDataKey);
        }
    }
    //#endregion
    
    //#region Properties
    /** Data of the game (all data of each player, ...) */
    protected get gameData(): GameData {
        return this._gameData;
    }
    //#endregion
} 