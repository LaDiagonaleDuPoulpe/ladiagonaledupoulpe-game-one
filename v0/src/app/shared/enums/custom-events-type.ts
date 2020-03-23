/**
 * Type of event that scene could be listened
 */
export enum CustomEventType {
    /** Use it when the player is dying, not really dead */
    diying = 'diyingPlayer',
    /** Use id when the player is dead : end game */
    died = 'diedPlayer',
    /** Use it when the player is reborn */
    revival = 'revivalPlayer'
};