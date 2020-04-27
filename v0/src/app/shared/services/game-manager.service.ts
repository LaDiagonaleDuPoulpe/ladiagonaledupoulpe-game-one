import { singleton } from "tsyringe";
import GameData from '../../core/models/game/game-data';
import PlayerData from '../../core/models/game/player-data';
import { BaseScene } from '../../core/scenes/base.scene';
import { CustomPlayerEventType } from "../enums/custom-player-events-type";
import { GameDataLoaderService } from './game-data-loader.service';
import { RebornRulesManager } from './reborn-rules-manager';
import { LifeStateType } from "../enums/life-state-type";
import { StatusBarType } from "../enums/status-bar-type";

/** Services that manages game rules: player stats, update of health, .. */
@singleton()
export class GameManagerService {
    //#region Fields
    private _gameData: GameData;
    protected __globalDataKey = 'default-global-data';
    private _currentPlayer: PlayerData;
    private _playerList: PlayerData[] = [];
    private _currentScene: BaseScene;
    //#endregion

    //#region Constructors
    constructor(private _gameDataLoader: GameDataLoaderService,
                private _rebornRulesManager: RebornRulesManager) {
    }
    //#endregion
    
    //#region Public methods
    /** You have to call this method first to set the json cache loader */
    public init(currentScene: BaseScene) {
        this._currentScene = currentScene;
    }

    /** Updates the player data health value */
    public updatePlayerHealth(value: number) {
        const player = this.getActivePlayer();

        if (player) {
            player.updateStatPart(value, StatusBarType.xp);

            if (! player.isAlive) {
                this._currentScene.emitDiyingEvent();
            }
        }
    }
    
    /** 
     * Player can reborn. But there are some rules to be able to do it.
     * If all rules are ok, player can reborn, otherwise, player really dies
     * It will call emit event from current scene
     */
    public tryToReborn() {
        const player = this.getActivePlayer();
        let canReborn = false;
        let emitAction = this._currentScene.emitEnfOfGameEvent;

        if (! player.isAlive) {
            canReborn = this._rebornRulesManager.isEnable(player, this._gameDataLoader.actionsData) == LifeStateType.reborn;

            if (canReborn) {
                emitAction = this._currentScene.emitRebornEvent;
            }
            
            emitAction.call(this._currentScene);
        }
    }

    /** Reinit data to their default values */
    public reinitData() {
        this.playerList[0].reinitData();
    }
    //#endregion
    
    //#region Internal methods
    // TODO: 24/01/2020: should be updated when multi player will arrive
    /** Gets the data of the current player */
    protected getActivePlayer(): PlayerData {
        const gameData = this.gameData;

        this.fillPlayerList();

        return this._currentPlayer;
    }

    private fillPlayerList() {
        if (this.gameData && ! this._currentPlayer) {
            this._currentPlayer = new PlayerData(this.gameData.players[0]);
            this._playerList.push(this._currentPlayer);
        }
    }
    //#endregion
    
    //#region Properties
    /** Data of the game (all data of each player, ...) */
    protected get gameData(): GameData {
        return this._gameDataLoader.gameData;
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
