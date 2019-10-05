import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';

import { injectable, container } from 'tsyringe';
import { LevelService } from '../../shared/services/level-service';

/**
 * Boot scene : scene will be loaded to start the game
 */
@injectable()
export class BootScene extends BaseScene {
    constructor(protected _logger: DefaultLogger, private level: LevelService) {
        super(BootScene.name, _logger);
    }

    //#region public methods
    preload() {
                
    }

    create(data: any) {
        this._logger.log('create', data);

        
    }
    //#endregion
}