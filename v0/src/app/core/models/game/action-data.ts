import { CostImpact } from './cost-impact-data';

/** It represents one action in the game that get impact in statistic of the player */
export class ActionData {
    //#region Fields
    /** Name as key of the action */
    public name: string;
    
    /** Cost of the action */
    public costImpact: CostImpact;
    //#endregion
}