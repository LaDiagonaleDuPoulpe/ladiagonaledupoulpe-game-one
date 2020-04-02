import { singleton } from "tsyringe";
import GameData from '../../core/models/game/game-data';
import PlayerData from '../../core/models/game/player-data';
import { BaseScene } from '../../core/scenes/base.scene';
import { CustomEventType } from "../enums/custom-events-type";

/** Services that manages game rules: player stats, update of health, .. */
@singleton()
export class GameManagerService {
    //#region Fields
    private _gameData: GameData;
    protected __globalDataKey = 'default-global-data';
    private _cacheManager: Phaser.Cache.BaseCache;
    private _jsonLoader: Phaser.Loader.LoaderPlugin;
    private _currentPlayer: PlayerData;
    private _playerList: PlayerData[] = [];
    private _currentScene: BaseScene;
    //#endregion

    //#region Constructors
    constructor() {
        console.log('-----> gamedata new');
    }
    //#endregion
    
    //#region Public methods
    /** You have to call this method first to set the json cache loader */
    public init(cache: Phaser.Cache.BaseCache, jsonLoader: Phaser.Loader.LoaderPlugin,
                currentScene: BaseScene) {
        this._cacheManager = cache;
        this._jsonLoader = jsonLoader;
        this._currentScene = currentScene;
    }

    /** Loads data in cache */
    public load() {
        this.loadGameData();
    }

    /** Updates the player data health value */
    public updatePlayerHealth(value: number) {
        const player = this.getActivePlayer();

        if (player) {
            player.updateHealth(value);

            if (! player.isAlive) {
                this._currentScene.emitDiyingEvent();
            }
        }
    }
    
    /** 
     * Player can reborn. But there are some rules to be able to do it.
     * If all rules are ok, player can reborn, otherwise, player really dies
     */
    public tryToReborn() {
        const player = this.getActivePlayer();

        // TODO: 24/03/2020, if synale power is ok, we can reborn
        if (! player.isAlive) {
            this._currentScene.emitEnfOfGameEvent();
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

        this.fillPlayerList();

        return this._currentPlayer;
    }

    private fillPlayerList() {
        if (this.gameData && ! this._currentPlayer) {
            this._currentPlayer = Object.assign(new PlayerData(), this.gameData.players[0]);
            this._playerList.push(this._currentPlayer);
        }
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

    /** 
     * Gets list of the players in the game
     * Note: now, there is only one player
     */
    public get playerList(): PlayerData[] {
        if (this._playerList.length == 0) {
            this.fillPlayerList();
        }

        return this._playerList;
    }
    //#endregion
}
