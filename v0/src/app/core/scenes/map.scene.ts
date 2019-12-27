import { injectable } from 'tsyringe';

import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';

/**
* Scene with map loading, (tile json loaded)
*/
@injectable()
export class MapScene extends BaseMapLevelScene {    
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _objectCreator: ObjectCreator,
        protected _animationsCreator: AnimationsCreator) {
            super(MapScene.name, _logger, _levelManageService, 
                  _objectCreator, _animationsCreator);
        }        
        
}