import { Prefab } from "../prefabs/prefab";

/** Content of the status bar */
export class StatusBarContent {
    /** Identity */
    key: string
    /** Value in the health box */
    healthValue: number;
    /** Max of the health bar */
    healthMaxValue: number;
    /** Avatar sprite of the current item */
    prefabAvatar: Prefab    
}