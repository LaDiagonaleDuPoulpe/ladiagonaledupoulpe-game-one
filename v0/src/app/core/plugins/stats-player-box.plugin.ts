import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';

/** Plugin to display one box with stats of one player */
export class StatsPlayerBoxPlugin extends BaseModalPlugin {
    //#region Fields
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    public toggleWindow(visibility: boolean) {
        super.toggleWindow(visibility);
    }
    //#endregion

    //#region Internal methods
    protected createWindow() {
        super.createWindow(); 

        this.createOuterWindow(10, 50, 200, 100);
    }
    //#endregion
}