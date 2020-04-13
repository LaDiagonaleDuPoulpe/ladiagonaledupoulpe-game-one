/**
 * Type of event that scene could be listened
 */
export enum CustomPlayerEventType {
    /** Use it when the player is dying, not really dead */
    diying = 'diyingPlayer',
    /** Use it when the player stop to die and you want to verify he can reborn */
    endOfDying = 'endOfDyingPlayer',
    /** Use id when the player is dead : end game */
    died = 'diedPlayer',
    /** Use it when the player is reborn */
    reborn = 'rebornPlayer',
    /** Use if when the player has been reborn and you want to do something later */
    endOfReborn = 'endOfRebornPlayer',
    /** Use if when the player starts to hit an object and you want to init collision action */
    beginHitByCollision = 'beginHitByCollisionPlayer',
    /** Use it when the player hits an object and you want to update the health */
    endHitByCollision = 'endHitCollisionPlayer'
};