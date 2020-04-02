import { PrefabType } from '../../shared/enums/prefab-type';
import { SceneType } from '../../shared/enums/scene-type';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { LevelConfig } from '../models/levels/level-config';
import { Prefab } from '../models/prefabs/prefab';
import { SceneData } from '../models/scenes/scene-data';
import { PropertiesSetting } from '../models/properties-setting';
import { Style } from '../models/style';
import { DialogModalPlugin } from '../plugins/dialog-modal.plugin';
import GameData from '../models/game/game-data';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { StatsPlayerBoxManagerPlugin } from '../plugins/stats-player-box-manager.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import PlayerData from '../models/game/player-data';
import { StatusBarPlugin } from '../plugins/status-bar.plugin';
import { SceneConfigurationPropertiesSetting } from '../models/scene-configuration-properties-setting';
import { CustomEventType } from '../../shared/enums/custom-events-type';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

/**
* Parent class of all custom scenes of the game
*/
export class BaseScene extends Phaser.Scene {
    //#region fields
    private _levelConfig: LevelConfig;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    //#endregion
    
    constructor(key: string, 
                protected _logger: DefaultLogger, 
                protected _levelManager: LevelManageService,
                protected _gameDataManager: GameManagerService,
                protected _gameDataLoaderManager: GameDataLoaderService) {
        super({
            key: key
        });
    }
    
    //#region public methods
    /**
    * Initialize scene with json file (the json file is parsed and you get an object with all configuration)
    * @param config Configuration from json file
    */
    init(config: LevelConfig) {
        console.log('---- base scene : init');
        this.levelConfig = config;
        this._cursors = this.input.keyboard.createCursorKeys();
        
        this.initializeGlobalMessageBox();
        this.initializeStatsPlayerMessageBox();
        this.applyMainConfiguration();
        
        this._gameDataLoaderManager.init(this.cache.json, this.load);
        this.gameDataManager.init(this);
    }
    
    preload() {
        console.log('---- base scene : preload');
    }
    
    /**
    * Calls next scene and starts it
    * @param nextLevelKey You can force the next level to go to next scene
    */
    public goToNextScene(nextLevelKey: string = '') {
        if (nextLevelKey === '') {
            nextLevelKey = this._levelManager.next();
        }
        this.levelConfig.nextLevelToLoadByKey = nextLevelKey;

        this.scene.start(SceneType.loading, this.levelConfig);
    }
    
    /**
    * Searches a prefab in config json object by type
    */
    public getOnePrefabByType(type: PrefabType): Prefab {
        return this.levelConfig.data.prefabs.find(item => item.type == type);
    }

    /** Launches a refresh to each stats player box */
    public refreshPlayersStats() {
        this.playerStatsBoxManager.refresh();
    }

    /** Emits diying event */
    public emitDiyingEvent() {
        this.events.emit(CustomEventType.diying);
    }

    /** Emits end of dying event */
    public emitEndOfDyingEvent() {
        this.events.emit(CustomEventType.endOfDying);
    }

    /** Player is dead, game is gone */
    public emitEnfOfGameEvent() {
        this.events.emit(CustomEventType.died);
    }
    //#endregion
    
    //#region Internal methods
    private initializeGlobalMessageBox() {
        this.messageBox.init(this.messageBoxConfiguration);
    }   

    private initializeStatsPlayerMessageBox() {
        this.playerStatsBoxManager.init(this.statsPlayerBoxConfiguration);
    }

    private applyMainConfiguration() {
        if (this.defaultConfiguration) {
            this.cameras.main.setBackgroundColor(this.defaultConfiguration.backgroudStyle.fill);
        }
    }
    //#endregion
    
    //#region Properties
    /**
    * Gets default configuration of the scene
    */
    public get defaultConfiguration(): SceneConfigurationPropertiesSetting {
        return this.levelConfig && this.levelConfig.data && this.levelConfig.data.defaultConfiguration ? 
                this._levelConfig.data.defaultConfiguration : null;
    }
    
    /**
    * Gets default style of the current scene (fill and font)
    */
    public get defaultStyle(): Style {
        return this.defaultConfiguration ? this.defaultConfiguration.style : null;
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
    public get messageBoxConfiguration(): DialogModalConfiguration | null {
        return (this.defaultConfiguration ? 
            this.defaultConfiguration.messageBox : null);
    }

    /**
     * Stats player box configuration (color, background color, ...)
     */
    public get statsPlayerBoxConfiguration(): DialogModalConfiguration | null {
        return (this.defaultConfiguration ? 
            this.defaultConfiguration.statsPlayerBox : null);
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

    /** Manager to create all player stats box for each player */
    public get playerStatsBoxManager(): StatsPlayerBoxManagerPlugin {
        return <StatsPlayerBoxManagerPlugin> (this['playerStatModalManagerPlugin']);
    }

    /** Gets data manager for the game (player data, ...) */
    protected get gameDataManager(): GameManagerService {
        return this._gameDataManager;
    }

    /** 
     * List of the player in the game (be careful, it's not the sprite player list !) 
     * Here we can get stats as health, magic power, ...
     * */
    public get playerList(): PlayerData[] {
        return this.gameDataManager.playerList;
    }
    //#endregion
}