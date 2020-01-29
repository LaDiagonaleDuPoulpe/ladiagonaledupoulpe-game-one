import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';

/** Plugin to display a box with stats of one player */
export class StatsPlayerBoxPlugin extends BaseModalPlugin {
    //#region Fields
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    //#endregion

    //#region Internal methods
    protected createWindow() {
        throw new Error("Method not implemented.");
    }
    protected toggleWindow(visibility: boolean) {
        throw new Error("Method not implemented.");
    }
    //#endregion
}