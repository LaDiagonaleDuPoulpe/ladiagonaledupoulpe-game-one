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
import { GameDataManagerService } from '../../shared/services/game-data-manager.service';

/**
* Scene where octopuses are inside the spaceship
* All is broken, shadow scene, with spikes
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
        _gameDataManager: GameDataManagerService) {
    super(InsideSpaceShipMapScene.name, _logger, _levelManageService, 
        _colliderManagerService, _objectCreator, _animationsCreator, 
        _lightManager, _gameDataManager);
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

    /**
    * Override this method to manage key up listener
    */
    protected onArrowUp(event: KeyboardEvent) {
        (<OctopusSprite> this.spritePlayers[0]).moveUp();
    }
    
    /**
    * Override this method to manage key down listener
    */
    protected onArrowDown(event: KeyboardEvent) {
        (<OctopusSprite> this.spritePlayers[0]).moveDown();
    }
    
    /**
    * Override this method to manage key left listener
    */
    protected onArrowLeft(event: KeyboardEvent) {
        (<OctopusSprite> this.spritePlayers[0]).moveLeft();
    }
    
    /**
    * Override this method to manage key right listener
    */
    protected onArrowRight(event: KeyboardEvent) {
        (<OctopusSprite> this.spritePlayers[0]).moveRight();
    }
    //#endregion
}