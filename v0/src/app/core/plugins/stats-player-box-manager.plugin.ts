import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import { StatsPlayerBoxPlugin } from './stats-player-box.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { Position } from '../models/position';
import PlayerData from '../models/game/player-data';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { CustomStatusBarEventType } from '../../shared/enums/custom-status-bar-event-type';

/** Plugin to display several box with stats of each player */
export class StatsPlayerBoxManagerPlugin extends BaseModalPlugin {
    //#region Fields
    private _statsBoxList: Dictionary<StatsPlayerBoxPlugin> = {};
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this.defineEventListeners();
    }
    
    //#region Public methods
    public toggleWindow(visibility: boolean) {
        //this._statsBoxList.forEach(box => box.toggleWindow(visibility));
    }
    //#endregion
    
    //#region Internal methods
    private defineEventListeners() {
        this._scene.events.on(CustomStatusBarEventType.updateStats, this.refreshStatValues, this);
        //this._scene.events.on('toggle', this.refresh, this);
    }

    private refreshStatValues(player: PlayerData) {
        const box = this._statsBoxList[player.key];
        box.refresh();
    }

    protected createBox() {
        let currentPosition = Object.assign({}, this.configuration.position);

        this.scene.playerList.forEach(player => {
            this.createOneBox(player, currentPosition);

            currentPosition.x += this.configuration.position.width + 50;
        });         
    }

    private createOneBox(player: PlayerData, currentPosition: Position) {
        const oneBox = new StatsPlayerBoxPlugin(player, this.scene, this.pluginManager);
        this._statsBoxList[player.key] = oneBox;

        const position = Object.assign(new Position(), this.configuration.position);
        position.x = currentPosition.x;
        position.y = currentPosition.y;
        this.configuration.position = position;

        oneBox.init(this.configuration);
    }
    //#endregion
}