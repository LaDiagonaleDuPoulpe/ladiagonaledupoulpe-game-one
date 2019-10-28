import { injectable } from "tsyringe";
import { Dictionary } from '../../shared/custom-types/dictionary';
import { DefaultLogger } from "../../shared/services/default-logger";
import { LevelManageService } from "../../shared/services/level-manager.service";
import { BaseLevelScene } from './base-level.scene';
import { BaseMapLevelScene } from './base-map-level.scene';

/**
* Scene with map loading, (tile json loaded)
*/
@injectable()
export class MapScene extends BaseMapLevelScene {    
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService) {
            super(MapScene.name, _logger, _levelManageService);
        }
        
        
    }