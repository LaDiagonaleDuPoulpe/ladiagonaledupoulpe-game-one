import PlayerStatisticData from "./player-statistic-data";
import { Prefab } from '../prefabs/prefab';

/** Player of the game */
export default class PlayerData {
    //#region Fields
    /** Key to find the player */
    public key: string;

    /** Data of the player */
    public stats: PlayerStatisticData;

    /** Defines the prefab to display in the stats player box */
    public prefabAvatar: Prefab;
    //#endregion

    //#region Public methods
    /** Réinitialize all data of the current player */
    public reinitData() {
        this.updateHealth(this.stats.health.max);
        this.updateSynalePower(this.stats.synalePower.max);
    }

    /** Updates health of the player, and check if player is yet alive */
    public updateHealth(value: number) {
        this.stats.health.quantity += value;

        if (this.stats.health.quantity < 0) {
            this.stats.health.quantity = 0;
        }
    }

    /** Updates synale power */
    public updateSynalePower(value: number) {
        this.stats.synalePower.quantity += value;

        if (this.stats.synalePower.quantity < 0) {
            this.stats.synalePower.quantity = 0;
        }
    }

    /** Can we use the power from now */
    public getEnoughSynalePower(cost: number): boolean {
        return this.stats.synalePower.quantity >= cost;
    }
    //#endregion

    //#region Properties
    /** Health value is > 0 */
    public get isAlive(): boolean {
        return this.stats.health.quantity > 0;
    }

    /** True if synale power is more than 0 */
    public get isSynalePowerAlive(): boolean {
        return this.stats.synalePower.quantity > 0;
    }
    //#endregion
}
