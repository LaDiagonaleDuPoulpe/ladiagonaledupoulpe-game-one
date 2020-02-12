import { BaseMapLevelScene } from "../scenes/base-map-level.scene";
import { StatusBarConfiguration } from '../models/statusBar/status-bar-configuration';
import { config } from "rxjs";

/** Plugin to add one or more status bar on the game scene, and save all in cache */
export class StatusBarPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _textures: Phaser.Textures.CanvasTexture[] = [];
    //#endregion
    
    constructor(private _scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    /** Adds new status bar */
    public addOne(configuration: StatusBarConfiguration) {
        this.createOuterBox(configuration);
        // TODO: 12/02/2020: adds default configuration for status bar in a json file (maybe the global ?) 
    }
    //#endregion

    //#region Internal methods
    private createOuterBox(configuration: StatusBarConfiguration) {
        const textureKey = configuration.key + '_' + this._textures.length;

        const texture = this._scene.textures.createCanvas(textureKey, 
                                                          configuration.position.width, configuration.position.height);
        var grd = texture.context.createLinearGradient(0, 0, 100, 256);
        
        // grd.addColorStop(0, '#8ED6FF');
        // grd.addColorStop(1, '#004CB3');

        grd.addColorStop(0, configuration.beginColor);
        grd.addColorStop(1, configuration.endColor);
        
        texture.context.fillStyle = grd;
        texture.context.fillRect(0, 0, configuration.position.width, configuration.position.height);

        this._textures.push(texture);

        var image = this.scene.add.image(configuration.position.x, configuration.position.y, textureKey);
        image.setDepth(120);
        image.setScrollFactor(0);

        texture.refresh();
    }
    //#endregion
}