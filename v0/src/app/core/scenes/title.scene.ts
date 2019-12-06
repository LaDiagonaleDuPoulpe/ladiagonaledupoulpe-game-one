import { injectable } from 'tsyringe';

import { PrefabType } from '../../shared/enums/prefab-type';
import { SceneType } from '../../shared/enums/scene-type';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { LevelConfig } from '../models/levels/level-config';
import { ObjectCreator } from '../prefab-sprites/objects/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { CloudCreator } from '../prefab-sprites/objects/creators/clouds-creator';

@injectable()
export class TitleScene extends BaseMapLevelScene {
    //#region fields
    private _lastGeneratedCloudTime: Date;
    //#endregion

    constructor(protected _logger: DefaultLogger,
                protected _levelManageService: LevelManageService,
                protected _objectCreator: ObjectCreator,
                private _cloudCreator: CloudCreator) {
        super(TitleScene.name, _logger, _levelManageService, _objectCreator);
    }
    
    //#region public methods
    init(data: LevelConfig) {
        super.init(data);
    }

    update() {
        super.update();
        this.createNewCloud();
    }

    /**
     * Starts the game, gets next scene and starts it
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
    createNewCloud() {
        this._cloudCreator.createNewOne(this, this._objectCreator, this.saveSpriteInScene.bind(this));
    }

    protected onKeyUp(event: KeyboardEvent) {
        this._logger.log('keyUp');
    }
    
    protected onKeyDown(event: KeyboardEvent) {
        this._logger.log('keyDown');
    }
    //#endregion
}