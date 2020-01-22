import { singleton } from "tsyringe";
import GameData from '../../core/models/game/game-data';

/** Services that manages game data : player stats, update of health, .. */
@singleton()
export class GameDataManagerService {
    //#region Fields
    private _gameData: GameData;
    protected __globalDataKey = 'default-global-data';
    private _cacheManager: Phaser.Cache.BaseCache;
    private _jsonLoader: Phaser.Loader.LoaderPlugin;
    //#endregion
    
    //#region Public methods
    /** You have to call this method first to set the json cache loader */
    public init(cache: Phaser.Cache.BaseCache, jsonLoader: Phaser.Loader.LoaderPlugin) {
        this._cacheManager = cache;
        this._jsonLoader = jsonLoader;
    }

    /** Loads data in cache */
    public load() {
        this.loadGameData();
    }
    //#endregion
    
    //#region Internal methods
    /** Loads game data from cache */
    private setGameData() {        
        this._gameData = this._cacheManager.get(this.__globalDataKey);
    }
    //#endregion
    
    //#region Properties
    /** Data of the game (all data of each player, ...) */
    protected get gameData(): GameData {
        if (! this._gameData) {
            this.setGameData();
        }
        
        return this._gameData;
    }

    private loadGameData() {
        if (! this.gameData) {
            this._jsonLoader.json(this.__globalDataKey, 'assets/global/global-settings.json');
        }    
    }
    //#endregion
}
