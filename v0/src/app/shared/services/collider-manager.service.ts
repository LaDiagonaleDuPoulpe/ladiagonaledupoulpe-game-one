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
            // TODO: 24/01/20120, See how to get json properties from transmitter sprite, about health collision damage
            gameDataManager.updatePlayerHealth(- (<PrefabSprite> transmitter).collisionDamage);
            receiver[action.commandName]();
        }
    }
    //#endregion
}
;