import { singleton } from "tsyringe";
import ColliderAction from '../../core/models/colliders/collider.action';
import { BaseLevelScene } from '../../core/scenes/base-level.scene';
import { Dictionary } from '../custom-types/dictionary';

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
    execute(transmitter: Phaser.GameObjects.Sprite, receiver: Phaser.GameObjects.Sprite) {
        const action = this._actions.find(item => {
            return item.transmitterKey === transmitter.name &&
            item.receiverKey === receiver.name;
        });
        
        if (action) {
            const actors: Dictionary<Phaser.GameObjects.Sprite> = {};
            actors[transmitter.name] = transmitter;
            actors[receiver.name] = receiver;
            
            const activeActor = actors[action.actorKey];
            if (activeActor) {
                const method = activeActor[action.commandName];
                if (method) {
                    method();
                }
            }
        }
    }
    //#endregion
}
;