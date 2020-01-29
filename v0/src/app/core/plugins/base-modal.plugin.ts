import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';

/** Base of all modal window in the game */
export abstract class BaseModalPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _configuration: DialogModalConfiguration;
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
    /** Allows you to create window. Overrides it to create the window */
    protected abstract createWindow(); 

    /** Allows you to manage visibility of the message box */
    protected abstract toggleWindow(visibility: boolean);
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
    //#endregion
} 