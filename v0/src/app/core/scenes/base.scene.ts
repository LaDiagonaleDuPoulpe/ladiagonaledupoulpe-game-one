import { PrefabType } from '../../shared/enums/prefab-type';
import { SceneType } from '../../shared/enums/scene-type';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { LevelConfig } from '../models/levels/level-config';
import { Prefab } from '../models/prefab';
import { SceneData } from '../models/scenes/scene-data';
import { PropertiesSetting } from '../models/properties-setting';
import { Style } from '../models/style';
import { DialogModalPlugin } from '../plugins/dialog-modal.plugin';

/**
* Parent class of all custom scenes of the game
*/
export class BaseScene extends Phaser.Scene {
    //#region fields
    private _levelConfig: LevelConfig;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    //#endregion
    
    constructor(key: string, protected _logger: DefaultLogger, protected _levelManager: LevelManageService) {
        super({
            key: key
        });
    }
    
    //#region public methods
    init(config: LevelConfig) {
        this.levelConfig = config;
        this._cursors = this.input.keyboard.createCursorKeys();

        this.prepareMessageBox();
    }
    
    preload() {
        
    }
    
    /**
    * Calls next scene and starts it
    */
    public goToNextScene() {
        this.levelConfig.nextLevelToLoadByKey = this._levelManager.next();
        this.scene.start(SceneType.loading, this.levelConfig);
    }
    
    /**
    * Searches a prefab in config json object by type
    */
    public getOnePrefabByType(type: PrefabType): Prefab {
        return this.levelConfig.data.prefabs.find(item => item.type == type);
    }
    //#endregion

    //#region Intrnal methods
    private prepareMessageBox() {
        this.messageBox.init(this.messageBoxConfiguration);
    }
    //#endregion
    
    //#region properties
    /**
     * Gets default configuration of the scene
     */
    public get defaultConfiguration(): PropertiesSetting {
        return this._levelConfig.data.defaultConfiguration;
    }

    /**
     * Gets default style of the current scene (fill and font)
     */
    public get defaultStyle(): Style {
        return this.defaultConfiguration.style;
    }

    /**
    * Gets scene data (from json file)
    */
    public get configData(): SceneData {
        return this.levelConfig.data;
    }
    
    /**
    * Gets level config
    */
    public get levelConfig(): LevelConfig {
        return this._levelConfig;
    }
    
    /**
    * Sets level config
    */
    public set levelConfig(value: LevelConfig) {
        this._levelConfig = value;
    }

    /**
     * Message box configuration (color, background color, ...)
     */
    public get messageBoxConfiguration() {
        return (this.levelConfig && this.levelConfig.data ? this.levelConfig.data.defaultConfiguration.messageBox : null);
    }

    /**
     * Gets the logger service
     */
    protected get logger(): DefaultLogger {
        return this._logger;
    }

    /**
     * Gets cursors to manage key press
     */
    public get cursors(): Phaser.Types.Input.Keyboard.CursorKeys {
        return this._cursors;
    }

    /**
     * Message box to display text
     */
    public get messageBox(): DialogModalPlugin {
        return <DialogModalPlugin> (this['dialogModalPlugin']);
    }
    //#endregion
}