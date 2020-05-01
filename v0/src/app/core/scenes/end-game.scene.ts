import { injectable } from "tsyringe";
import { BaseMapLevelScene } from './base-map-level.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { LightManager } from '../plugins/light-manager';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';
import { SceneKeyType } from '../../shared/enums/scene-key-type';

/**
* Scene to activate when player dies, it's the end of the game
*/
@injectable()
export class EndGameScene extends BaseMapLevelScene {    
    constructor(
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _colliderManagerService: ColliderManagerService,
        protected _objectCreator: ObjectCreator,
        protected _animationsCreator: AnimationsCreator,
        protected _lightManager: LightManager,
        protected _gameDataManager: GameManagerService,
        protected _gameDataLoaderManager: GameDataLoaderService) {
            super('EndGameScene', _logger, _levelManageService, _colliderManagerService,
                  _objectCreator, _animationsCreator, _lightManager, _gameDataManager, 
                  _gameDataLoaderManager);
        }        
    
    //#region Public methods
    /**
     * Go back to the main scene (menu)
     */
    public goToMainScene() {
        this.goToNextScene(SceneKeyType.title);
    }
    //#endregion
}