import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from "./base-level-scene";
import { LevelConfig } from '../models/level-config';
import { SceneType } from '../../shared/enums/scene-type';

@injectable()
export class TitleScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger) {
        super(TitleScene.name, _logger);
    }
    
    //#region public methods
    init(data: LevelConfig) {
        super.init(data);
    }
    
    startGame() {
        

        this.scene.start(SceneType.boot, {
            scene: 'town' 
        });
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