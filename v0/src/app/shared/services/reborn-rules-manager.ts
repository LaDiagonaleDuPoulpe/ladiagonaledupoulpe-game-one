import { singleton } from "tsyringe";
import PlayerData from '../../core/models/game/player-data';
import { LifeStateType } from "../enums/life-state-type";
import { ActionData } from '../../core/models/game/action-data';

/**
 * Rules of the reborn ability
 * It will verify if the player will be able to reborn thanks to the synale power
 */
@singleton()
export class RebornRulesManager {
    //#region Constants
    private REBORN_KEY = 'reborn';
    //#endregion

    //#region Public methods
    /** 
     * Verify if the player can reborn and return true
     * @returns It returns an enum value about the life state
    */
    public isEnable(player: PlayerData, actionCosts: ActionData[]): LifeStateType {
        let state = LifeStateType.dead;

        const action = actionCosts.find(item => item.name == this.REBORN_KEY);
        if (action) {
            const enabled = player[action.costImpact.methodToVerif](action.costImpact.value);
            player[action.costImpact.methodToUpdate](- action.costImpact.value);

            if (enabled) {
                state = LifeStateType.reborn;
            }
        }

        return state;
    }
    //#endregion
}