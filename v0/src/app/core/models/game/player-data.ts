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
    /** Updates health of the player, and check if player is yet alive */
    public updateHealth(value: number) {
        this.stats.health += value;
    }

    
    //#endregion

    //#region Properties
    public get isAlive(): boolean {
        return this.stats.health > 0;
    }
    //#endregion
}
