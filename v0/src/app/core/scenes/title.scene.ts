import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from "./base-level.scene";
import { LevelConfig } from '../models/level-config';
import { SceneType } from '../../shared/enums/scene-type';
import { LevelManageService } from '../../shared/services/level-manager.service';

@injectable()
export class TitleScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService) {
        super(TitleScene.name, _logger, _levelManageService);
    }
    
    //#region public methods
    init(data: LevelConfig) {
        super.init(data);
    }
    
    /**
     * Starts the game
     */
    startGame() {        
        this._logger.log('startGame', this.levelConfig);
        
        this.levelConfig.nextLevelToLoadByKey = this._levelManageService.next();
        this.scene.start(SceneType.loading, this.levelConfig);
    }

    goToNextScene() {
        this.startGame();
    }
    //#endregion
    
    //#region internal methods
    protected onKeyUp(event: KeyboardEvent) {
        this._logger.log('keyUp');
    }
    
    protected onKeyDown(event: KeyboardEvent) {
        this._logger.log('keyDown');
    }
    //#endregion
}