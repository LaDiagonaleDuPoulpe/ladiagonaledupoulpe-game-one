import { singleton } from "tsyringe";
import GameData from '../../core/models/game/game-data';
import PlayerData from '../../core/models/game/player-data';

/** Services that manages game data : player stats, update of health, .. */
@singleton()
export class GameDataManagerService {
    //#region Fields
    private _gameData: GameData;
    protected __globalDataKey = 'default-global-data';
    private _cacheManager: Phaser.Cache.BaseCache;
    private _jsonLoader: Phaser.Loader.LoaderPlugin;
    private _currentPlayer: PlayerData;
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

    /** Updates the player data health value */
    public updatePlayerHealth(value: number) {
        const player = this.getActivePlayer();

        if (player) {
            console.log('updatePlayerHealth::value', value);
            player.updateHealth(value);
        }
    }
    //#endregion
    
    //#region Internal methods
    /** Loads game data from cache */
    private setGameData() {         
        this._gameData = this._cacheManager.get(this.__globalDataKey);
    }
    
    private loadGameData() {
        if (! this.gameData) {
            this._jsonLoader.json(this.__globalDataKey, 'assets/global/global-settings.json');
        }    
    }
    
    // TODO: 24/01/2020: should be updated when multi player will arrive
    /** Gets the data of the current player */
    protected getActivePlayer(): PlayerData {
        const gameData = this.gameData;

        if (gameData && ! this._currentPlayer) {
            this._currentPlayer = Object.assign(new PlayerData(), gameData.players[0]);
        }

        return this._currentPlayer;
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
    //#endregion
}
