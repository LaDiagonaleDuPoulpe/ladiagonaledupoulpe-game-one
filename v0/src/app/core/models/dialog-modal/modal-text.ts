import { EventType } from "./event-type";
import { Prefab } from '../prefab';

/**
 * Text to display in modal text
 */
export class ModalText {
    //#region Fields
    /** Text to display */
    public message: string;

    /** Order of the message */
    public order ?: number;

    /** Duration before we display the message */
    public time: number;

    /** Callback function after the end  */
    public callback ?: Function | undefined;

    /** Event time to display the message */
    public event: EventType;

    /** Prefab to display in the message box */
    public prefab: Prefab;
    //#endregion
}