import PlayerStatisticData from "./player-statistic-data";

/** Data of the game for one player */
export default class PlayerData {
    //#region Fields
    /** Key to find the player */
    public key: string;

    /** Data of the player */
    public stats: PlayerStatisticData;
    //#endregion
}
