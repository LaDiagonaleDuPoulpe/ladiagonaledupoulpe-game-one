import SynalePowerData from "./synale-power-data";
import { StatisticData } from './statistic-data';

/** Statistics of one player */
export default class PlayerStatisticData extends StatisticData {
    //#region Fields
    /** Power synale : a quantity of energy to use */
    public synalePower: SynalePowerData;
    //#endregion
}