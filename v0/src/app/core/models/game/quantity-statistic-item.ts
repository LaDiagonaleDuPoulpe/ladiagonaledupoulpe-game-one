/***
 * Each statistic item of the player (or enemy) got a value and a max of this value
 * (for example, health value quantity and its max value)
 */
export default class QuantityStatisticItem {
    //#region Constructors
    constructor(fromItem?: QuantityStatisticItem) {
        if (fromItem) {
            Object.assign(this, fromItem);
        }
    }
    //#endregion

    //#region Public methods
    /** 
     * Update value of the quantity item.
     * Checks limit of the update value [0..max]
     */
    public update(value: number) {
        this.quantity += value;

        if (this.quantity < 0) {
            this.quantity = 0;
        }

        if (this.quantity > this.max) {
            this.quantity = this.max;
        }
    }
    //#endregion

    //#region Fields
    /** Current value of the statistic item */
    public quantity: number;

    /** Max value of the item */
    public max: number;
    //#endregion
}