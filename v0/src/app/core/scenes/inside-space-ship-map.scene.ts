import { MapScene } from './map.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { injectable } from 'tsyringe';

/**
 * Scene where octopuses are inside the spaceship
 * All is broken, shadow scene, with spikes
 */
@injectable()
 export class InsideSpaceShipMapScene extends BaseMapLevelScene {
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _objectCreator: ObjectCreator) {
            super(InsideSpaceShipMapScene.name, _logger, _levelManageService, _objectCreator);
        }    
}