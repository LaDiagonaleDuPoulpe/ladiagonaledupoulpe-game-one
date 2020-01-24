import PlayerStatisticData from "./player-statistic-data";

/** Player of the game */
export default class PlayerData {
    //#region Fields
    /** Key to find the player */
    public key: string;

    /** Data of the player */
    public stats: PlayerStatisticData;
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
