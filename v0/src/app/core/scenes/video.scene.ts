import { injectable } from 'tsyringe';

import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseLevelScene } from './base-level.scene';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { LightManager } from '../plugins/light-manager';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

// https://github.com/yoeleven/phaser3-gameobject-video/blob/master/component/video.js

/**
 * Scene to load one video in full screen
 */
@injectable()
 export class VideoScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService,
                protected _colliderManagerService: ColliderManagerService,
                protected _objectCreator: ObjectCreator,
                protected _animationsCreator: AnimationsCreator,
                protected _lightManager: LightManager,
                protected _gameDataManager: GameManagerService,
                protected _gameDataLoaderManager: GameDataLoaderService) {
        super(VideoScene.name, _logger, _levelManageService, _colliderManagerService,
              _objectCreator, _animationsCreator, _lightManager, _gameDataManager,
              _gameDataLoaderManager);
    }

    //#region public methods
    applyBuildingsCollisionDetection(sprite: Phaser.GameObjects.Sprite) {}

    applyCollisionDetectionToPlayer(sprite: Phaser.GameObjects.Sprite) {}
    //#endregion
        
}