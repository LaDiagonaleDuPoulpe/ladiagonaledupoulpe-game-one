import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import { StatsUnitBoxPlugin } from './stats-unit-box.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { Position } from '../models/position';
import PlayerData from '../models/game/player-data';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { CustomStatusBarEventType } from '../../shared/enums/custom-status-bar-event-type';
import { StatusBarContent } from '../models/statusBar/status-bar-content';

/** Plugin to display several box with stats of each player */
export class StatsPlayerBoxManagerPlugin extends BaseModalPlugin {
    //#region Fields
    private _statsBoxList: Dictionary<StatsUnitBoxPlugin> = {};
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this.defineEventListeners();
    }
    
    //#region Public methods
    public toggleWindow(visibility: boolean) {
        // 10/04/2020, Nothing to do here, for now
    }
    //#endregion
    
    //#region Internal methods
    private defineEventListeners() {
        this._scene.events.on(CustomStatusBarEventType.updateStats, this.refreshStatValues, this);
        this._scene.events.on(CustomStatusBarEventType.reinit, this.reinitValuesWithAnimation, this);
    }

    private refreshStatValues(player: PlayerData) {
        const box = this._statsBoxList[player.key];
        box.updateValues(this.getContentFromPlayer(player));
    }

    private reinitValuesWithAnimation(player: PlayerData) {
        const box = this._statsBoxList[player.key];
        box.reinitData(this.getContentFromPlayer(player), true);
    }    

    private getContentFromPlayer(player: PlayerData): StatusBarContent {
        return { 
            key: player.key,
            healthValue: player.stats.health,
            healthMaxValue: player.stats.healthMax,
            prefabAvatar: player.prefabAvatar
        };
    }

    protected createBox() {
        let currentPosition = Object.assign({}, this.configuration.position);

        this.scene.playerList.forEach(player => {
            this.createOneBox(player, currentPosition);

            currentPosition.x += this.configuration.position.width + 50;
        });         
    }

    private createOneBox(player: PlayerData, currentPosition: Position) {
        const oneBox = new StatsUnitBoxPlugin(this.getContentFromPlayer(player), this.scene, this.pluginManager);
        this._statsBoxList[player.key] = oneBox;

        const position = Object.assign(new Position(), this.configuration.position);
        position.x = currentPosition.x;
        position.y = currentPosition.y;
        this.configuration.position = position;

        oneBox.init(this.configuration);
    }
    //#endregion
}