import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';

/** Base of all modal window in the game */
export abstract class BaseModalPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _configuration: DialogModalConfiguration;
    private _graphicObject: Phaser.GameObjects.Graphics;
    //#endregion
    
    constructor(private _scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    init(config: DialogModalConfiguration) {
        this._configuration = config;
        
        if (config) {
            this.createWindow();
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

    
    /** 
     * Displays new content. 
     * Overrides if to define how the refresh will be done
     */
    abstract refresh();
    //#endregion
    
    //#region Internal methods
    /** 
     * Allows you to create window. Overrides it to create the window
     * Here, we initialize the graphic object of the modal box
     */
    protected createWindow() {
        this._graphicObject = this.prepareOneGraphicsObject();
    } 

    protected prepareOneGraphicsObject(): Phaser.GameObjects.Graphics {
        const object = this.scene.add.graphics();
        this.setFixed(object);

        return object;
    }

    /**
     * Creates outer window inside the graphic object (it's the box with limited borders)
     * @param x Starting x position
     * @param y Starting y position
     * @param rectWidth Width of the box
     * @param rectHeight Height of the box
     */
    protected createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.graphicObject.lineStyle(this.configuration.borderThickness, this.configuration.borderColor);
        this.graphicObject.strokeRect(x, y, rectWidth, rectHeight);
    }

    /**
     * Creates the inside box, where we can find data information
     * @param x Top X position
     * @param y Top Y position
     * @param rectWidth Width of the inside box
     * @param rectHeight Height of the inside box
     */
    protected createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this.graphicObject.fillStyle(this.configuration.windowColor);
        this.graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    /** Sets modal box to a fixed mode (can't move, and before all game objects) */
    protected setFixed(object: Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite, depth: number = 100) {
        object.setScrollFactor(0);
        object.setDepth(depth);
    }

    /** Gets the width of the game, based on system game config */
    protected getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    /** Gets the height of the game, based on system game config */
    protected getGameHeight() {
        return this.scene.sys.game.config.height;
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
    
    /** Scene where the modal box is display */
    protected get scene(): BaseMapLevelScene {
        return this._scene;
    }

    /** Current graphic object that represents the modal box */
    protected get graphicObject(): Phaser.GameObjects.Graphics {
        return this._graphicObject;
    }
    //#endregion
} 