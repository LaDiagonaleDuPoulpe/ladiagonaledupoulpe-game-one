import { DialogModalConfiguration } from '../dialog-modal/dialog-modal-configuration';
import { StatusBarConfiguration } from './status-bar-configuration';

/** Configuration about player status box  */
export class StatusPlayerBoxConfiguration extends DialogModalConfiguration {
    //#region Properties
    /** Default configuration about the health status bar */
    public healthBarBox: StatusBarConfiguration;
    //#endregion
}