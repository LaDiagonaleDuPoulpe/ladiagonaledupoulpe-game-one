import { injectable } from 'tsyringe';

import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/objects/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';

/**
* Scene with map loading, (tile json loaded)
*/
@injectable()
export class MapScene extends BaseMapLevelScene {    
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _objectCreator: ObjectCreator) {
            super(MapScene.name, _logger, _levelManageService, _objectCreator);
        }        
        
}