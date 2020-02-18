import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { BaseDisplayingDataBoxPlugin } from './base-displaying-data-box.plugin';

/** Base of all modal window in the game */
export abstract class BaseModalPlugin extends BaseDisplayingDataBoxPlugin {
    //#region Fields
    private _configuration: DialogModalConfiguration;
    //#endregion
    
    constructor(protected _scene: BaseMapLevelScene, 
                protected _pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, _pluginManager);
    }
    
    //#region Public methods
    init(config: DialogModalConfiguration) {
        this._configuration = config;
        
        if (config) {
            this.createBox();
        }
    }

    /** Display the box with graphic object too */
    show() {
        this.toggleWindow(true);
    }
    
    /**
    * Hides the message box
    */
    hide() {
        this.toggleWindow(false);
    }

    /** Allows you to manage visibility of the message box */
    toggleWindow(visibility: boolean) {
        this.graphicObject.setVisible(visibility);
    }
    //#endregion
    
    //#region Internal methods
    /**
     * Creates outer window inside the graphic object (it's the box with limited borders)
     * @param x Starting x position
     * @param y Starting y position
     * @param rectWidth Width of the box
     * @param rectHeight Height of the box
     */
    protected createOuterBox(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.createBoxAsRectangle(this.graphicObject,
                                  { x: x, y: y, width: rectWidth, height: rectHeight},
                                  this.configuration.borderThickness,
                                  this.configuration.borderColor);
    }

    /**
     * Creates the inside box, where we can find data information
     * @param x Top X position
     * @param y Top Y position
     * @param rectWidth Width of the inside box
     * @param rectHeight Height of the inside box
     */
    protected createInnerBox(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.graphicObject.fillStyle(this.configuration.windowColor);
        this.graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    //#endregion
    
    //#region Properties
    /** Gets configuration of the current modal */
    protected get configuration(): DialogModalConfiguration {
        return this._configuration;
    }

    /** Sets configuration of the current modal */
    protected set configuration(value: DialogModalConfiguration) {
        this._configuration = value;
    }
    //#endregion
} 