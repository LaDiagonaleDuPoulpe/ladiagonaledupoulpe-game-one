import { injectable } from 'tsyringe';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { BaseLevelScene } from './base-level-scene';
// https://github.com/yoeleven/phaser3-gameobject-video/blob/master/component/video.js

/**
 * Scene to load one video in full screen
 */
@injectable()
 export class VideoScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger,
                private _levelManageService: LevelManageService) {
        super(VideoScene.name, _logger);
    }
        
}