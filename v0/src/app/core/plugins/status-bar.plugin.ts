import { BaseMapLevelScene } from "../scenes/base-map-level.scene";
import { StatusBarConfiguration } from '../models/statusBar/status-bar-configuration';
import { config } from "rxjs";
import { StatusBarType } from '../../shared/enums/status-bar-type';

/** Plugin to add one or more status bar on the game scene, and save all in cache */
export class StatusBarPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _texture: Phaser.Textures.CanvasTexture;
    private _statusValueAsText: Phaser.GameObjects.Text;
    private _configuration: StatusBarConfiguration;
    private _type: StatusBarType;
    //#endregion
    
    constructor(private _scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    /** Initializes new status bar */
    public init(configuration: StatusBarConfiguration) {
        super.init();

        this._configuration = configuration;
        this._type = configuration.type;

        this.createOuterBox(this._configuration);
        this.createTextBox(this._configuration);
    }

    /** Allows you to refresh status bar value and text onside */
    public refresh(currentValue: number, maxValue: number) {
        const healthContent = `${this._type}: ${currentValue} / ${maxValue}`;

        this._statusValueAsText.setText(healthContent);
    }
    //#endregion

    //#region Internal methods
    private createOuterBox(configuration: StatusBarConfiguration) {
        const textureKey = configuration.key;

        const texture = this._scene.textures.createCanvas(textureKey, 
                                                          configuration.position.width, configuration.position.height);
        var grd = texture.context.createLinearGradient(0, 0, 100, 256);
    

        grd.addColorStop(0, configuration.beginColor);
        grd.addColorStop(1, configuration.endColor);
        
        texture.context.fillStyle = grd;
        texture.context.fillRect(0, 0, configuration.position.width, configuration.position.height);

        this._texture = texture;

        var image = this.scene.add.image(configuration.position.x, configuration.position.y, textureKey);
        this.setFixed(image);

        texture.refresh();
    }

    private createTextBox(configuration: StatusBarConfiguration) {
        this._statusValueAsText = this.scene.make.text({
            x: configuration.position.x,
            y: configuration.position.y,
            text: "",
            style: {
                font: this._configuration.textStyle.font,
                fill: this._configuration.textStyle.fill
            }
        });

        this.setFixed(this._statusValueAsText, 121);
    }

    private setFixed(item: Phaser.GameObjects.Image | Phaser.GameObjects.Text, depth = 120) {
        item.setDepth(depth);
        item.setScrollFactor(0);
    }
    //#endregion
}