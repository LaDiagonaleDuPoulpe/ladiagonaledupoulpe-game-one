/**
 * Cost impact of one action in the game
 */
export class CostImpact {
    //#region Fields
    /** Name of the method to update stats part of the player to impact */
    public methodToUpdate: string;

    /** Name of the method to verify if we can use the action */
    public methodToVerif: string;

    /** Value of the impact : the cost */
    public value: number;
    //#endregion
}