import { map } from 'rxjs/operators';
import { injectable, container } from 'tsyringe';

import { BaseScene } from './base.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelService } from '../../shared/services/level.service';
import { Level } from '../models/level';
import { LevelConfig } from '../models/level-config';
import { SceneType } from '../../shared/enums/scene-type';
import { SceneData } from '../models/scene-data';
import { LevelManageService } from '../../shared/services/level-manager.service';

/**
* Boot scene : scene will be loaded to start the game
*/
@injectable()
export class MainScene extends BaseScene {
    //#region fields
    private _levels: Level[];
    //#endregion

    constructor(protected _logger: DefaultLogger, 
                private _levelService: LevelService,
                private _levelManageService: LevelManageService) {
        super(MainScene.name, _logger, _levelManageService);
    }

    //#region public methods
    preload() {
        this.prepareJsonContentsInCache();
        this._logger.log('MainScene', 'preload');
    }
    
    create(config: LevelConfig) {
        this.levelConfig = config;
        this.levelConfig.levels = this._levels;

        this._logger.log('MainScene:create', this._levels);
        this.goToNextScene();
    }
    //#endregion

    //#region internal methods
    private prepareJsonContentsInCache() {
        const pipe = this._levelService.selectAll().pipe(map(items => {

            items.forEach(item => {
                this.load.json(item.key, item.path);
            }, this);

            return items;
        }));
        pipe.subscribe(items => this._levels = items);
    }
    //#endregion
}