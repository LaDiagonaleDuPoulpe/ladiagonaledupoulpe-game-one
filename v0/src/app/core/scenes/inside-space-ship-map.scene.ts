import { MapScene } from './map.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { injectable } from 'tsyringe';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { OctopusSprite } from '../prefab-sprites/arcades/octopus.sprite';
import { LightManager } from '../plugins/light-manager';
import { toHexaInt } from '../../shared/converters/string-converter';
import { ModalText } from '../models/dialog-modal/modal-text';
import { ModalContent } from '../models/dialog-modal/modal-content';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

/**
* Scene where octopuses are inside the spaceship
* All is broken, shadow scene, with spikes
* todo: 25/02/2020, See how to put the start following camera inside the base classe (with json option ?)
*/
@injectable()
export class InsideSpaceShipMapScene extends BaseMapLevelScene {
    constructor(
        _logger: DefaultLogger,
        _levelManageService: LevelManageService,
        _colliderManagerService: ColliderManagerService,
        _objectCreator: ObjectCreator,
        _animationsCreator: AnimationsCreator,
        _lightManager: LightManager,
        _gameDataManager: GameManagerService,
        _gameDataLoaderManager: GameDataLoaderService) {
    super(InsideSpaceShipMapScene.name, _logger, _levelManageService, 
        _colliderManagerService, _objectCreator, _animationsCreator, 
        _lightManager, _gameDataManager, _gameDataLoaderManager);
    }    
    
    //#region Public methods
    create() {
        super.create();
        
        this.cameras.main.startFollow(this.spritePlayers[0]);
    }
    //#endregion
    
    //#region Internal methods
    private activateNextAction(){
    }
    //#endregion
}