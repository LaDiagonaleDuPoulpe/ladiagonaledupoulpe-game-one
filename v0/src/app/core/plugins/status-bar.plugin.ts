import { BaseMapLevelScene } from "../scenes/base-map-level.scene";

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
    public addOne() {
        const textureKey = 'gradienttest' + this._textures.length;

        const texture = this._scene.textures.createCanvas('gradienttest' + this._textures.length, 16, 256);
        var grd = texture.context.createLinearGradient(0, 0, 0, 256);
        
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');
        
        texture.context.fillStyle = grd;
        texture.context.fillRect(0, 0, 16, 256);

        this._textures.push(texture);

        var image = this.scene.add.image(8 * 16, 0, textureKey);
        image.setDepth(120);

        texture.refresh();
    }
    //#endregion
}