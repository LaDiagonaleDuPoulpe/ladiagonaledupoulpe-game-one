import { map } from 'rxjs/operators';
import { injectable, container } from 'tsyringe';

import { BaseScene } from './base-scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelService } from '../../shared/services/level.service';
import { Level } from '../models/level';
import { LevelConfig } from '../models/level-config';
import { SceneType } from '../../shared/enums/scene-type';
import { SceneData } from '../models/scene-data';

/**
* Boot scene : scene will be loaded to start the game
*/
@injectable()
export class MainScene extends BaseScene {
    //#region fields
    private _levels: Level[];
    //#endregion

    constructor(protected _logger: DefaultLogger, private _levelService: LevelService) {
        super(MainScene.name, _logger);
    }

    //#region public methods
    preload() {
        this.prepareJsonContentsInCache();
        this._logger.log('MainScene', 'preload');
    }
    
    create(config: LevelConfig) {
        config.levels = this._levels;
        // const levelData = this.cache.json.get(config.level.key);
        // const newConfig = <LevelConfig> Object.create(config);

        // this._logger.log('main', levelData);

        // newConfig.data = <SceneData> levelData;
        // newConfig.level = this._levels.find(item => item.key === config.level.key);

        this.scene.start(SceneType.loading, config);
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