import { Position } from '../position';
/** Configuration to custom each status bar of each status box */
export class StatusBarConfiguration {
    //#region Fields
    /** Key of the status bar */
    public key: string;

    /** Color of the status bar at the beginning */
    public beginColor: string;

    /** Color of the status bar at the end */
    public endColor: string;

    /** Position of the status bar in the box */
    public position: Position;

    /** Size of the current status value */
    public insideBoxWidth: number;
    //#endregion
}