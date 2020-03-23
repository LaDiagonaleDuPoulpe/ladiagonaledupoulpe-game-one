/**
 * List of the different actions in the game 
 */
export enum ActionType {
    /** Walking player */
    walk = 'walk',
    /** Not moving (with directions) player */
    idle = 'idle',
    /** Action when the player is dying, he is not dead yet */
    diying = 'diying',
    /** Action when the player was dead, and he is reborn */
    revival = 'revival',
    /** End of the game */
    died = 'died'
}