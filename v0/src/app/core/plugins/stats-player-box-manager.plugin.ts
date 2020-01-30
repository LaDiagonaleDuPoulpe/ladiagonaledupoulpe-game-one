import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import { StatsPlayerBoxPlugin } from './stats-player-box.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';

/** Plugin to display several box with stats of each player */
export class StatsPlayerBoxManagerPlugin extends BaseModalPlugin {
    //#region Fields
    private _statsBoxList: StatsPlayerBoxPlugin[] = [];
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    init(config: DialogModalConfiguration) {
        this.configuration = config;
    }
    //#endregion

    //#region Internal methods
    protected createWindow() {
        


    }
    protected toggleWindow(visibility: boolean) {
        throw new Error("Method not implemented.");
    }
    //#endregion
}