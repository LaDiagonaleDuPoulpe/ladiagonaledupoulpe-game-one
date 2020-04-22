import { Prefab } from "../prefabs/prefab";
import QuantityStatisticItem from '../game/quantity-statistic-item';
import { Dictionary } from '../../../shared/custom-types/dictionary';

/** Content of the status bar */
export class StatusBarContent {
    /** Identity */
    key: string;

    /** List of the values to display on the status bars box */
    contents: Dictionary<QuantityStatisticItem>;

    /** Avatar sprite of the current item */
    prefabAvatar: Prefab;
}