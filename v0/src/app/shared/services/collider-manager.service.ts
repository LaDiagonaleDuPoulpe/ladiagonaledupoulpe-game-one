import { singleton } from "tsyringe";
import ColliderAction from '../../core/models/colliders/collider.action';
import { BaseLevelScene } from '../../core/scenes/base-level.scene';
import { Dictionary } from '../custom-types/dictionary';
import { GameDataManagerService } from './game-data-manager.service';
import { PrefabSprite } from '../../core/prefab-sprites/prefab.sprite';

/**
* Service to manage calling collision action
* It decides wich action to launch, with valid arguments
*/
@singleton()
export class ColliderManagerService {
    //#region Fields
    private _actions: ColliderAction[];
    private _scene: BaseLevelScene;
    private _isAlreadyUpdateHealth: boolean;
    private _delayBeforeUpdateStatus = 400;
    //#endregion
    
    //#region Public methods
    /** First step: call this method to set the array of actions */
    init(scene: BaseLevelScene, actions: ColliderAction[]) {
        this._actions = actions;
        this._scene = scene;
    }
    
    /** Execute the valid action (if it exists) */
    execute(transmitter: Phaser.GameObjects.Sprite | PrefabSprite, 
            receiver: Phaser.GameObjects.Sprite,
            gameDataManager: GameDataManagerService) {
        const action = this._actions.find(item => {
            return item.transmitterKey === transmitter.name &&
            item.receiverKey === receiver.name;
        });
        
        if (action) {
            if (! this._isAlreadyUpdateHealth) {
                this._isAlreadyUpdateHealth = true;

                this._scene.time.addEvent({ 
                    delay: this._delayBeforeUpdateStatus, 
                    callback: this.updatePlayerHealth, 
                    callbackScope: this,
                    args: [- (<PrefabSprite> transmitter).collisionDamage, gameDataManager],
                    repeat: 0
                });

                this._scene.refreshPlayersStats();
            }
            
            receiver[action.commandName]();
        }
    }
    //#endregion

    //#region Internal methods
    private updatePlayerHealth(damage: number, gameDataManager: GameDataManagerService) {
        gameDataManager.updatePlayerHealth(damage);
        this._isAlreadyUpdateHealth = false;
    }
    //#endregion
}
;