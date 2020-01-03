import { BaseLevelScene } from '../scenes/base-level.scene';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from './dialog-modal-configuration';

/**
* Plugin to display a message box in current scene
*/
// https://phaser.io/examples/v3/view/plugins/scene-plugin-test-1
export class DialogModalPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _configuration = new DialogModalConfiguration();
    private _graphicObject: Phaser.GameObjects.Graphics;
    //#endregion
    
    constructor(private _scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    boot() {
        super.boot();
    }

    show() {
        console.log('Here we will display the message');
    }
    //#endregion
    
    //#region Internal methods
    private createWindow() {
        const gameHeight = this.getGameHeight();
        const gameWidth = this.getGameWidth();
        const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this._graphicObject = this.scene.add.graphics();
        
        this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    }
    
    private createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.fillStyle(this._configuration.windowColor);
        this._graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    private createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.lineStyle(this._configuration.borderThickness, this._configuration.borderColor);
        this._graphicObject.strokeRect(x, y, rectWidth, rectHeight);
    }
    
    private getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    private getGameHeight() {
        return this.scene.sys.game.config.height;
    }
    
    private calculateWindowDimensions(width: string | number, height: string | number) {
        var x = this._configuration.padding;
        var y = +height - this._configuration.windowHeight - this._configuration.padding;
        var rectWidth = +width - (this._configuration.padding * 2);
        var rectHeight = this._configuration.windowHeight;
        
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }
    //#endregion
}

