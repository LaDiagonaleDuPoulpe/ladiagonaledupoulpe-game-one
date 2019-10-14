import { injectable } from "tsyringe";
import { BaseScene } from "./base-scene";
import { LevelManageService } from "../../shared/services/level-manager.service";
import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from './base-level-scene';

/**
 * Scene with map loading, (tile json loaded)
 */
@injectable()
export class MapScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService) {
                super(MapScene.name, _logger);
    }

    
}