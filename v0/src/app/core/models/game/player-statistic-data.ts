import SynalePowerData from "./synale-power-data";

/** Statistics of one player */
export default class PlayerStatisticData {
    //#region Fields
    /** Health of the player */
    public health: number;

    /** Max of the health from the current level of the player */
    public healthMax: number;

    /** Power synale : a quantity of energy to use */
    public synalePower: SynalePowerData;
    //#endregion
}