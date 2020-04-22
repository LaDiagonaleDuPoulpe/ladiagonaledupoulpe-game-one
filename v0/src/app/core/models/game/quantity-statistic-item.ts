/***
 * Each statistic item of the player (or enemy) got a value and a max of this value
 * (for example, health value quantity and its max value)
 */
export default class QuantityStatisticItem {
    //#region Fields
    /** Current value of the statistic item */
    public quantity: number;

    /** Max value of the item */
    public max: number;
    //#endregion
}