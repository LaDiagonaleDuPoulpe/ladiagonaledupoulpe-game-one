import { injectable } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';

/**
* Loads all assets of the game
*/
@injectable()
export class LoadingScene extends BaseScene {
    constructor(protected _logger: DefaultLogger, ) {
        super(LoadingScene.name, _logger);
    }

    //#region internal methods
    
    //#endregion

    //#region public methods

    //#endregion
}