/**
 * Action to execute 
 */
class Action {
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

    /** Name of the mthod thos execute in actor sprite */
    public commandName: string;

    /** Content of all arguments, sperated by comma */
    public argumentsAsString: string;
    //#endregion
}

export default Action;