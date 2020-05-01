import Action from '../actions/action';

/**
 * Action to execute when there was a collision
 */
class ColliderAction extends Action {
    //#region Fields
    /**
     * Key of the emitter of the collision
     */
    public transmitterKey: string;

    /**
     * Key of the receiver of the collision
     */
    public receiverKey: string;

    /** Key of the sprite that will execute the command (found by commandName attribute) */
    public actorKey: string;
    //#endregion
}

export default ColliderAction;