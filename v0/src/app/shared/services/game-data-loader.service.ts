import { singleton } from "tsyringe";
import GameData from "../../core/models/game/game-data";
import { BaseScene } from "../../core/scenes/base.scene";
import { ActionData } from '../../core/models/game/action-data';

/**
 * This classe allows you to load all default data in the game
 */
@singleton()
export class GameDataLoaderService {
    //#region Fields
    protected __globalDataKey = 'default-global-data';
    protected __actionsDataKey = 'default-actions-data';
    private _cacheManager: Phaser.Cache.BaseCache;
    private _jsonLoader: Phaser.Loader.LoaderPlugin;
    private _gameData: GameData;
    private _actionCosts: ActionData[];
    //#endregion

    //#region Constructors
    constructor() {
    }
    //#endregion

    //#region Public methods
    /** You have to call this method first to set the json cache loader */
    public init(cache: Phaser.Cache.BaseCache, 
                jsonLoader: Phaser.Loader.LoaderPlugin) {
        this._cacheManager = cache;
        this._jsonLoader = jsonLoader;
    }

    /** Initializes the files to be loaded */
    public load() {
        this.loadGameData();
        this.loadActionsListData();
    }
    //#endregion

    //#region Internal methods
    private loadGameData() {
        if (! this.gameData) {
            this._jsonLoader.json(this.__globalDataKey, 'assets/global/global-settings.json');
        }    
    }
    
    private loadActionsListData() {
        if (! this.actionsData) {
            this._jsonLoader.json(this.__actionsDataKey, 'assets/global/actions.json');
        }
    } 
    //#endregion

    //#region Properties
    /** Data of the game (all data of each player, ...) */
    public get gameData(): GameData {
        if (! this._gameData) {
            this.setGameData();
        }
        
        return this._gameData;
    }

    /** Actions with their cost */
    public get actionsData(): ActionData[] {
        if (! this._actionCosts) {
            this.setActionsData();
        }
        
        return this._actionCosts;
    }

    /** Loads game data from cache */
    private setGameData() {         
        this._gameData = this._cacheManager.get(this.__globalDataKey);
    }

    private setActionsData() {
        this._actionCosts = this._cacheManager.get(this.__actionsDataKey);
    }
    //#endregion
}