import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from "./base-level-scene";
import { LevelConfig } from '../models/level-config';
import { SceneType } from '../../shared/enums/scene-type';
import { LevelManageService } from '../../shared/services/level-manager.service';

@injectable()
export class TitleScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService) {
        super(TitleScene.name, _logger);
    }
    
    //#region public methods
    init(data: LevelConfig) {
        super.init(data);
    }
    
    startGame() {
        
        this._logger.log('startGame', this.levelConfig);
        
        this.levelConfig.level.key = this._levelManageService.next();

        this.scene.start(SceneType.loading, this.levelConfig);
    }
    //#endregion
    
    //#region internal methods
    protected onKeyUp(event: KeyboardEvent) {
        this._logger.log('keyUp');
        this.startGame();
    }
    
    protected onKeyDown(event: KeyboardEvent) {
        this._logger.log('keyDown');
    }
    //#endregion
}