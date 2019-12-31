import { PrefabType } from "../../shared/enums/prefab-type";
import { Position } from "./position";
import { Style } from "./style";
import { Animation } from './animations/animation';

/**
 * Prefab properties setting
 */
export class PropertiesSetting {
    //#region fields
    /**
     * Group of the sprite (for collision management)
     */
    public group: string;

    /**
     * Where you put the prefab
     */
    public anchor: Position | null;

    /**
     * Scale ratio
     */
    public scale: Position | null;

    /**
     * text to display
     */
    public text: string | null;

    /**
     * Custom style of the prefab
     */
    public style: Style;

    /**
     * Texture to apply to this sprite
     */
    public texture: string | null;

    /**
     * Frame of the sprite prefab
     */
    public frame: string | null;

    /**
     * Depth in the scene
     */
    public depth: integer | null;

    /**
     * List of animations for the prefab
     */
    public animations: Animation[];

    /**
     * Visibility of the item
     */
    public visible: boolean;

    /**
     * Delay of a animation in prefab
     */
    public delay: number | null;
    //#endregion
}