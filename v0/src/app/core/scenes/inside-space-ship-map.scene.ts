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

/**
* Scene where octopuses are inside the spaceship
* All is broken, shadow scene, with spikes
*/
@injectable()
export class InsideSpaceShipMapScene extends BaseMapLevelScene {
    constructor(
        _logger: DefaultLogger,
        _levelManageService: LevelManageService,
        _objectCreator: ObjectCreator,
        _animationsCreator: AnimationsCreator,
        _lightManager: LightManager) {
            super(InsideSpaceShipMapScene.name, _logger, _levelManageService, 
                _objectCreator, _animationsCreator, _lightManager);
            }    
            
            //#region Public methods
            create() {
                super.create();
                
                this.cameras.main.startFollow(this.players[0]);
                
                this.messageBox.show();
            }
            //#endregion
            
            //#region Internal methods
            /**
            * Override this method to manage key up listener
            */
            protected onArrowUp(event: KeyboardEvent) {
                (<OctopusSprite> this.players[0]).moveUp();
            }
            
            /**
            * Override this method to manage key down listener
            */
            protected onArrowDown(event: KeyboardEvent) {
                this.logger.log('down :', event);
                (<OctopusSprite> this.players[0]).moveDown();
            }
            
            /**
            * Override this method to manage key left listener
            */
            protected onArrowLeft(event: KeyboardEvent) {
                this.logger.log('left :', event);
                (<OctopusSprite> this.players[0]).moveLeft();
            }
            
            /**
            * Override this method to manage key right listener
            */
            protected onArrowRight(event: KeyboardEvent) {
                this.logger.log('right :', event);
                (<OctopusSprite> this.players[0]).moveRight();
            }
            //#endregion
        }