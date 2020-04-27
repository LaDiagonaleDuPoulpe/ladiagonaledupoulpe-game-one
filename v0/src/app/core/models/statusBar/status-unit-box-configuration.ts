import { DialogModalConfiguration } from '../dialog-modal/dialog-modal-configuration';
import { StatusBarConfiguration } from './status-bar-configuration';
import { Dictionary } from '../../../shared/custom-types/dictionary';

/** Configuration about one unit (player or enemy) status box  */
export class StatusUnitBoxConfiguration extends DialogModalConfiguration {
    //#region Properties
    /** Default configuration about the status bar list */
    public statusBoxes: Dictionary<StatusBarConfiguration> = {};
    //#endregion
}