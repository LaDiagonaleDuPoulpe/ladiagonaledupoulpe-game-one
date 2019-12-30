import { MapScene } from './map.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseMapLevelScene } from './base-map-level.scene';
import { injectable } from 'tsyringe';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';

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
        _animationsCreator: AnimationsCreator) {
            super(InsideSpaceShipMapScene.name, _logger, _levelManageService, 
                _objectCreator, _animationsCreator);

                console.log('InsideSpaceShipMapScene:logger', _logger);
            }    
            
            //#region Internal methods
            /**
            * Override this method to manage key up listener
            */
            protected onArrowUp(event: KeyboardEvent) {
                console.log('InsideSpaceShipMapScene::onArrowUp=>this :', this);
                this.logger.log('up :', event);
                
                this.logger.log('==> octopus ?', this.players);
            }
            
            /**
            * Override this method to manage key down listener
            */
            protected onArrowDown(event: KeyboardEvent) {
                this.logger.log('down :', event);
            }
            
            /**
            * Override this method to manage key left listener
            */
            protected onArrowLeft(event: KeyboardEvent) {
                this.logger.log('left :', event);
            }
            
            /**
            * Override this method to manage key right listener
            */
            protected onArrowRight(event: KeyboardEvent) {
                this.logger.log('right :', event);
            }
            //#endregion
        }