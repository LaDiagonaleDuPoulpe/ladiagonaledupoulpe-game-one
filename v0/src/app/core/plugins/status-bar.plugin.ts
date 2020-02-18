import { BaseMapLevelScene } from "../scenes/base-map-level.scene";
import { StatusBarConfiguration } from '../models/statusBar/status-bar-configuration';
import { config } from "rxjs";
import { StatusBarType } from '../../shared/enums/status-bar-type';
import { BaseDisplayingDataBoxPlugin } from "./base-displaying-data-box.plugin";

/** Plugin to add one or more status bar on the game scene, and save all in cache */
export class StatusBarPlugin extends BaseDisplayingDataBoxPlugin {
    //#region Fields
    private _textureInnerBox: Phaser.Textures.CanvasTexture;
    private _statusValueAsText: Phaser.GameObjects.Text;
    private _configuration: StatusBarConfiguration;
    private _type: StatusBarType;
    //#endregion
    
    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }
    
    //#region Public methods
    /** Initializes new status bar */
    public init(configuration: StatusBarConfiguration) {
        super.init();

        this._configuration = configuration;
        this._type = configuration.type;

        this.createOuterBox(this._configuration);
        this.createInnerBox(this._configuration.position.x,
                            this._configuration.position.y,
                            this._configuration.position.width,
                            this._configuration.position.height);
        this.createTextBox(this._configuration);
    }

    /** Allows you to refresh status bar value and text onside */
    public update(currentValue: number, maxValue: number) {
        const content = `${this._type}: ${currentValue} / ${maxValue}`;

        this._statusValueAsText.setText(content);
    }
    //#endregion    

    //#region Internal methods
    private createOuterBox(configuration: StatusBarConfiguration) {
        this.createBox();

        const currentPosition = { 
            x: configuration.position.x, 
            y: configuration.position.y,  
            width: configuration.position.width,
            height: configuration.position.height
        };
        this.createBoxAsRectangle(this.graphicObject,
                                 currentPosition,
                                 configuration.borderSize,
                                 configuration.borderColor);        
    }

    protected createInnerBox(x: number, y: number, rectWidth: number, rectHeight: number) {
        const textureKey = `${this._configuration.key}_InnerBox`;

        const texture = this._scene.textures.createCanvas(textureKey, 
                                                          rectWidth, rectHeight);
        var grd = texture.context.createLinearGradient(0, 0, rectWidth / 2, rectHeight);
    

        grd.addColorStop(0, this._configuration.beginColor);
        grd.addColorStop(1, this._configuration.endColor);
        
        texture.context.fillStyle = grd;
        texture.context.fillRect(0, 0, rectWidth, rectHeight);

        this._textureInnerBox = texture;

        var image = this.scene.add.image(x, y, textureKey);
        this.setFixed(image);

        texture.refresh();
    }

    private createTextBox(configuration: StatusBarConfiguration) {
        this._statusValueAsText = this.scene.make.text({
            x: configuration.position.x,
            y: configuration.position.y - 10,
            text: "",
            style: {
                font: this._configuration.textStyle.font,
                fill: this._configuration.textStyle.fill
            }
        });

        this.setFixed(this._statusValueAsText, 121);
    }
    //#endregion
}