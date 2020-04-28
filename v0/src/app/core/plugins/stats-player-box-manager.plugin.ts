import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import { StatsUnitBoxPlugin } from './stats-unit-box.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { Position } from '../models/position';
import PlayerData from '../models/game/player-data';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { CustomStatusBarEventType } from '../../shared/enums/custom-status-bar-event-type';
import { StatusBarContent } from '../models/statusBar/status-bar-content';
import QuantityStatisticItem from '../models/game/quantity-statistic-item';
import { StatusBarType } from '../../shared/enums/status-bar-type';

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
        this._scene.events.on(CustomStatusBarEventType.updatePartOfStat, this.refreshOneStatValue, this);
        this._scene.events.on(CustomStatusBarEventType.reinit, this.reinitValuesWithAnimation, this);
        this._scene.events.on(CustomStatusBarEventType.reinitPartOfStat, this.reinitOneValueWithAnimation, this);
    }

    private reinitOneValueWithAnimation(player: PlayerData, type: StatusBarType) {
        let stats: Dictionary<QuantityStatisticItem> = null;
        const box = this._statsBoxList[player.key];

        stats = this.initStatListToUpdate(type, player);

        box.reinitData(this.prepareStatusBar(player, stats));
    }

    private refreshStatValues(player: PlayerData) {
        const box = this._statsBoxList[player.key];
        box.updateValues(this.getContentFromPlayer(player));
    }

    private refreshOneStatValue(key: StatusBarType, player: PlayerData) {
        let stats: Dictionary<QuantityStatisticItem> = null;
        const box = this._statsBoxList[player.key];

        stats = this.initStatListToUpdate(key, player);

        box.updateValues(this.prepareStatusBar(player, stats));
    }

    private reinitValuesWithAnimation(player: PlayerData) {
        const box = this._statsBoxList[player.key];
        box.reinitData(this.getContentFromPlayer(player), true);
    }   
    
    private initStatListToUpdate(key: StatusBarType, player: PlayerData): Dictionary<QuantityStatisticItem> {
        const stats: Dictionary<QuantityStatisticItem> = {};

        stats[key] = player.stats[key];

        return stats;
    }

    private prepareStatusBar(player: PlayerData, stats: Dictionary<QuantityStatisticItem>): StatusBarContent {
        return { 
            key: player.key,
            contents: stats,
            prefabAvatar: player.prefabAvatar
        };
    }

    private getContentFromPlayer(player: PlayerData): StatusBarContent {
        const stats: Dictionary<QuantityStatisticItem> = {};

        for(var key in StatusBarType) {
            stats[key] = new QuantityStatisticItem(player.stats[key]);
        }

        return this.prepareStatusBar(player, stats);
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