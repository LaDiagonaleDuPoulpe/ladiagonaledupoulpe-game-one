import { injectable } from 'tsyringe';

import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { LightManager } from '../plugins/light-manager';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

/**
* Scene with map loading, (tile json loaded)
*/
@injectable()
export class MapScene extends BaseMapLevelScene {    
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _colliderManagerService: ColliderManagerService,
        protected _objectCreator: ObjectCreator,
        protected _animationsCreator: AnimationsCreator,
        protected _lightManager: LightManager,
        protected _gameDataManager: GameManagerService,
        protected _gameDataLoaderManager: GameDataLoaderService) {
            super('MapScene', _logger, _levelManageService, _colliderManagerService,
                  _objectCreator, _animationsCreator, _lightManager, _gameDataManager,
                  _gameDataLoaderManager);
        }        
        
}