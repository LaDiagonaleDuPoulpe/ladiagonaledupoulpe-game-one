import { injectable } from 'tsyringe';

import { PrefabType } from '../../shared/enums/prefab-type';
import { SceneType } from '../../shared/enums/scene-type';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { LevelConfig } from '../models/levels/level-config';
import { ObjectCreator } from '../prefab-sprites/objects/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';

@injectable()
export class TitleScene extends BaseMapLevelScene {
    //#region fields
    private _lastGeneratedCloudTime: Date;
    //#endregion

    constructor(protected _logger: DefaultLogger,
                protected _levelManageService: LevelManageService,
                protected _objectCreator: ObjectCreator) {
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
        const isOkToGenerateCloud = Phaser.Math.Between(0, 100) % 35 === 0;

        if (this._map.objects.length > 0  && isOkToGenerateCloud) {            
            const cloudSprite = this._map.objects[0].objects.find(item => item.type === PrefabType.cloud);

            cloudSprite.x = -300;
            cloudSprite.y = Phaser.Math.Between(0, 450);

            this._objectCreator.createObject(cloudSprite, this, this.saveSpriteInScene);
        }
    }

    protected onKeyUp(event: KeyboardEvent) {
        this._logger.log('keyUp');
    }
    
    protected onKeyDown(event: KeyboardEvent) {
        this._logger.log('keyDown');
    }
    //#endregion
}