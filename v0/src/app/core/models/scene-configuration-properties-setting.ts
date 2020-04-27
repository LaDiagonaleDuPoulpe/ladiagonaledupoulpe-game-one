import { PropertiesSetting } from './properties-setting';
import { DialogModalConfiguration } from './dialog-modal/dialog-modal-configuration';
import { StatusUnitBoxConfiguration } from './statusBar/status-unit-box-configuration';
import { Style } from './style';

/**
 * It represents properties setting of the whole scene
 */
export class SceneConfigurationPropertiesSetting extends PropertiesSetting {
    //#region Fields
    /** Configuration about the message box about message to display */
    public messageBox: DialogModalConfiguration;

    /** Configuration about each box for each player : box to display stats of each player */
    public statsPlayerBox: StatusUnitBoxConfiguration;

    /** Style of the background of the scene */
    public backgroudStyle: Style;
    //#endregion
}