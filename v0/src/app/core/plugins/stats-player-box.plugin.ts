import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalPlugin } from './base-modal.plugin';
import PlayerData from '../models/game/player-data';
import { Position } from '../models/position';

/** Plugin to display one box with stats of one player */
export class StatsPlayerBoxPlugin extends BaseModalPlugin {
    //#region Fields
    private _healthText: Phaser.GameObjects.Text;
    //#endregion

    constructor(private _player: PlayerData,
                _scene: BaseMapLevelScene, 
                pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    public toggleWindow(visibility: boolean) {
        super.toggleWindow(visibility);
    }

    /** Displays new values of stats of the current player */
    public refresh() {
        this._healthText.setText(this._player.stats.health + "XP")
    }
    //#endregion

    //#region Internal methods
    protected createWindow() {
        super.createWindow(); 

        this.createOuterWindow(this.configuration.position.x, 
                               this.configuration.position.y, 
                               this.configuration.position.width, 
                               this.configuration.position.height);

        this.createInnerWindow(this.configuration.position.x, 
                                this.configuration.position.y, 
                                this.configuration.position.width, 
                                this.configuration.position.height);

        this.displayerStatsOf(this._player, this.configuration.position);
    }

    private displayerStatsOf(player: PlayerData, currentPosition: Position) {
        this._healthText = this.scene.make.text({
            x: currentPosition.x + 100,
            y: currentPosition.y + 20,
            text: "",
            style: {
                font: this.configuration.closeButtonStyle.font,
                fill: this.configuration.closeButtonStyle.fill
            }
        });

        this.setFixed(this._healthText);
        this.refresh();
    }
    //#endregion
}