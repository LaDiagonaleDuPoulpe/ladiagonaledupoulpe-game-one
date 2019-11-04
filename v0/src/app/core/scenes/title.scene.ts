import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from "./base-level.scene";
import { LevelConfig } from '../models/levels/level-config';
import { SceneType } from '../../shared/enums/scene-type';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { MapScene } from './map.scene';
import { BaseMapLevelScene } from './base-map-level.scene';
import { PrefabType } from '../../shared/enums/prefab-type';

@injectable()
export class TitleScene extends BaseMapLevelScene {
    //#region fields
    private _lastGeneratedCloudTime: Date;
    //#endregion


    constructor(protected _logger: DefaultLogger,
                protected _levelManageService: LevelManageService) {
        super(TitleScene.name, _logger, _levelManageService);


    }
    
    //#region public methods
    init(data: LevelConfig) {
        super.init(data);
    }

    update() {
        super.update();

        const isOkToGenerateCloud = Phaser.Math.Between(0, 100) % 35 === 0;

        if (this._map.objects.length > 0  && isOkToGenerateCloud) {            
            const cloudSprite = this._map.objects[0].objects.find(item => item.type === PrefabType.cloud);
            this._logger.log('update', cloudSprite);

            cloudSprite.x = 0;
            cloudSprite.y = Phaser.Math.Between(0, 400);

            this.createObject(cloudSprite);
        }
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