import { ModalText } from './modal-text';

/**
 * Content to display in the modal box
 * It's a list of messages (ModalText)
 */
export class ModalContent {
    //#region Fields
    /** Method to run after the end of displaying message */
    public endingCallBack: Function;

    /** List of message to display */
    public messageList: ModalText[];
    //#endregion
}