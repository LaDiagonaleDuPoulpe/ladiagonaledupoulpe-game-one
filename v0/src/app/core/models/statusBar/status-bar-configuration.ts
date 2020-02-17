import { Position } from '../position';
import { Style } from '../style';
import { StatusBarType } from '../../../shared/enums/status-bar-type';

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

    /** Current size of the inner box */
    public currentValue: number;

    /** Max size of the inner box */
    public maxValue: number;

    /** Style (font and fill) of the text */
    public textStyle: Style;

    /** Allows you to change, for example, text inside the status bar */
    public type: StatusBarType;
    //#endregion
}