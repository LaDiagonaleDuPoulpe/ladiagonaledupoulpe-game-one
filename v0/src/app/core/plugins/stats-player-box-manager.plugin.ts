import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import { StatsPlayerBoxPlugin } from './stats-player-box.plugin';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { Position } from '../models/position';
import PlayerData from '../models/game/player-data';

/** Plugin to display several box with stats of each player */
export class StatsPlayerBoxManagerPlugin extends BaseModalPlugin {
    //#region Fields
    private _statsBoxList: StatsPlayerBoxPlugin[] = [];
    //#endregion

    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    public toggleWindow(visibility: boolean) {
        this._statsBoxList.forEach(box => box.toggleWindow(visibility));
    }
    
    public refresh() {
        this._statsBoxList.forEach(item => item.refresh());
    }
    //#endregion

    //#region Internal methods
    protected createWindow() {
        let currentPosition = Object.assign({}, this.configuration.position);

        // INFO: 03/02/2020: For test only
        let secondPlayer = Object.assign({}, this.scene.playerList[0]);
        this.scene.playerList.push(secondPlayer);

        this.scene.playerList.forEach(player => {
            this.createOneBox(player, currentPosition);

            currentPosition.x += this.configuration.position.width + 50;
        });         
    }

    private createOneBox(player: PlayerData, currentPosition: Position) {
        const oneBox = new StatsPlayerBoxPlugin(player, this.scene, this.pluginManager);
        this._statsBoxList.push(oneBox);

        const position = Object.assign(new Position(), this.configuration.position);
        position.x = currentPosition.x;
        position.y = currentPosition.y;
        this.configuration.position = position;

        oneBox.init(this.configuration);

        // INFO: 31/01/2020: For test only
        oneBox.show();
    }
    //#endregion
}