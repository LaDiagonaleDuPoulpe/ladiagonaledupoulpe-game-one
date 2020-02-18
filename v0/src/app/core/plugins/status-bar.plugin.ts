import { BaseMapLevelScene } from "../scenes/base-map-level.scene";
import { StatusBarConfiguration } from '../models/statusBar/status-bar-configuration';
import { config } from "rxjs";
import { StatusBarType } from '../../shared/enums/status-bar-type';
import { BaseDisplayingDataBoxPlugin } from "./base-displaying-data-box.plugin";

/** Plugin to add one or more status bar on the game scene, and save all in cache */
export class StatusBarPlugin extends BaseDisplayingDataBoxPlugin {
    //#region Fields
    private _progressBar: Phaser.GameObjects.Graphics;
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

        this.createInnerBox(this._configuration.position.x,
            this._configuration.position.y,
            this._configuration.position.width,
            this._configuration.position.height);
            
        this.createOuterBox(this._configuration);
        this.createTextBox(this._configuration);
    }

    /** Allows you to refresh status bar value and text onside */
    public update(currentValue: number, maxValue: number) {
        const content = `${this._type}: ${currentValue} / ${maxValue}`;

        if (this._statusValueAsText) {
            this._statusValueAsText.setText(content);
        }
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
        this._progressBar = this.scene.add.graphics();
        this._progressBar.fillStyle(this._configuration.beginColor);

        this._progressBar.fillRoundedRect(0, 0, rectWidth, rectHeight);

        this._progressBar.setX(x);
        this._progressBar.setY(y);
        
        this.setFixed(this._progressBar); 
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