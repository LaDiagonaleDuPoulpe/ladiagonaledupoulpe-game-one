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
    
    /**
    * Hides the message box
    */
    hide() {
        this.toggleWindow(false);
    }
    //#endregion
    
    //#region Internal methods
    /** 
     * Allows you to create window. Overrides it to create the window
     * Here, we initialize the graphic object of the modal box
     */
    protected createWindow() {
        this._graphicObject = this.scene.add.graphics();
        this.setFixed(this.graphicObject);
    } 

    /** Allows you to manage visibility of the message box */
    protected abstract toggleWindow(visibility: boolean);

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