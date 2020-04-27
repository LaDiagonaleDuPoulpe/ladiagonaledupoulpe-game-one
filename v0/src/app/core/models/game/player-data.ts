import PlayerStatisticData from "./player-statistic-data";
import { Prefab } from '../prefabs/prefab';
import QuantityStatisticItem from './quantity-statistic-item';
import { StatusBarType } from '../../../shared/enums/status-bar-type';

/** Player of the game */
export default class PlayerData {
    //#region Constructors
    constructor(fromItem?: PlayerData) {
        if (fromItem) {
            Object.assign(this, fromItem);

            for(var key in StatusBarType) {
                this.stats[key] = new QuantityStatisticItem(fromItem.stats[key]);    
            }
        }
    }
    //#endregion

    //#region Fields
    /** Key to find the player */
    public key: string;

    /** Data of the player */
    public stats: PlayerStatisticData;

    /** Defines the prefab to display in the stats player box */
    public prefabAvatar: Prefab;
    //#endregion

    //#region Public methods
    /** Updates part (found with part value) of the statistic list */
    public updateStatPart(value: number, part: StatusBarType) {
        this.stats[part].quantity += value;
    }

    /** Updates synale power value */
    public updateSynalePower(value: number) {
        this.updateStatPart(value, StatusBarType.synale);
    }

    /** Reinitialize all data of the current player */
    public reinitData(part?: StatusBarType) {   
        if (part) {
            this.reinitOneStat(part);
        } else {
            for (var key in StatusBarType) {
               this.reinitOneStat(key);
            }
        }
    }

    /** Can we use the power from now */
    public getEnoughSynalePower(cost: number): boolean {
        return this.stats.synale.quantity >= cost;
    }
    //#endregion

    //#region Internal methods
    private reinitOneStat(key: string) {
        this.stats[key].quantity = this.stats[key].max;
    }
    //#endregion

    //#region Properties
    /** Health value is > 0 */
    public get isAlive(): boolean {
        return this.stats.xp.quantity > 0;
    }

    /** True if synale power is more than 0 */
    public get isSynalePowerAlive(): boolean {
        return this.stats.synale.quantity > 0;
    }
    //#endregion
}
