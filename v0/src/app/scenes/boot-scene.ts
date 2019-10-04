import { BaseScene } from './base-scene';
import { DefaultLogger } from '../services/default-logger';

import { injectable, container } from 'tsyringe';

/**
 * Boot scene : scene will be loaded to start the game
 */
@injectable()
export class BootScene extends BaseScene {
    constructor(protected _logger: DefaultLogger) {
        super(BootScene.name, _logger);
    }

    //#region public methods
    create(data: any) {
        this._logger.log('create', data);

        
    }
    //#endregion
}