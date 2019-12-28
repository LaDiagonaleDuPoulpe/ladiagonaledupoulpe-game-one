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
        protected _logger: DefaultLogger,
        protected _levelManageService: LevelManageService,
        protected _objectCreator: ObjectCreator,
        protected _animationsCreator: AnimationsCreator) {
            super(InsideSpaceShipMapScene.name, _logger, _levelManageService, 
                _objectCreator, _animationsCreator);
            }    
            
            //#region Internal methods
            /**
            * Override this method to manage key up listener
            */
            protected onArrowUp(event: KeyboardEvent) {
                console.log('event :', event);
            }
            
            /**
            * Override this method to manage key down listener
            */
            protected onArrowDown(event: KeyboardEvent) {
                console.log('event :', event);
            }
            
            /**
            * Override this method to manage key left listener
            */
            protected onArrowLeft(event: KeyboardEvent) {
                // nothing to do here
            }
            
            /**
            * Override this method to manage key right listener
            */
            protected onArrowRight(event: KeyboardEvent) {
                // nothing to do here
            }
            //#endregion
        }