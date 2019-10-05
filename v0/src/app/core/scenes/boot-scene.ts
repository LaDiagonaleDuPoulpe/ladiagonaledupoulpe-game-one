import { map } from 'rxjs/operators';
import { injectable, container } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelService } from '../../shared/services/level-service';
import { Level } from '../models/level';

/**
 * Boot scene : scene will be loaded to start the game
 */
@injectable()
export class BootScene extends BaseScene {
    //#region fields
    private _levels: Level[];
    //#endregion

    constructor(protected _logger: DefaultLogger, private _levelService: LevelService) {
        super(BootScene.name, _logger);
    }

    //#region public methods
    preload() {
        const pipe = this._levelService.selectAll().pipe(map(items => {
            items.forEach(item => this.load.json(item.key, item.path));
            return items;
        }));
        pipe.subscribe(items => this._levels = items);
    }

    create(data: any) {
        this._logger.log('create', data);

        
    }
    //#endregion
}