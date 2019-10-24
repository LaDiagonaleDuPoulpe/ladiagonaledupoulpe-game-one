import { PrefabType } from "../../shared/enums/prefab-type";
import { Position } from "./position";
import { Style } from "./style";

/**
 * Prefab properties setting
 */
export class PropertiesSetting {
    //#region fields
    /**
     * Type of the prefab
     */
    public type: PrefabType;

    /**
     * Group of the sprite (for collision management)
     */
    public group: string;

    /**
     * Where you put the prefab
     */
    public anchor: Position;

    /**
     * Scale ratio
     */
    public scale: Position;

    /**
     * text to display
     */
    public text: string;

    /**
     * Custom style of the prefab
     */
    public style: Style;

    /**
     * Texture to apply to this sprite
     */
    public texture: string;

    /**
     * Frame of the sprite prefab
     */
    public frame: string;

    /**
     * Depth in the scene
     */
    public depth: integer;
    //#endregion
}