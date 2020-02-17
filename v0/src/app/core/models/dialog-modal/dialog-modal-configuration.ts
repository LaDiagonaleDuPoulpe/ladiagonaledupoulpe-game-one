import { Style } from '../style';
import { Position } from '../position';
/**
 * Options to configure the dialog modal
 */ 
 export class DialogModalConfiguration {
    //#region Fields
    /**
     * Speed of the displayed text
     */
    public dialogSpeed = 15;

    /**
     * Border color of the box
     */
    public borderColor = 0xffffff;

    /**
     * Color of the window
     */
    public windowColor = 0xffffff;

    /**
     * Defines style of the close button
     */
    public closeButtonStyle: Style;

    /** Defines style of the modal content text */
    public contentStyle: Style;

    /**
     * Size of the box
     */
    public windowHeight = 150;

    /**
     * Inside padding
     */
    public padding = 0;

    /**
     * Bordersize  of the box
     */
    public borderThickness = 2;

    /**
     * Texture to display as a spoken person
     */
    public displayingPersonTexture: string;

    /** 
     * Current position of the box
     */
    public position: Position | null;
    //#endregion
}