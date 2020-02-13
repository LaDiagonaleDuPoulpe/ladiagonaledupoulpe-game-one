import PlayerData from '../models/game/player-data';
import { Position } from '../models/position';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalWithPrefabPlugin } from './base-modal-with-prefab.plugin';
import { StatusBarConfiguration } from '../models/statusBar/status-bar-configuration';
import { StatusPlayerBoxConfiguration } from '../models/statusBar/status-player-box-configuration';

/** Plugin to display one box with stats of one player */
export class StatsPlayerBoxPlugin extends BaseModalWithPrefabPlugin {
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
        const healthContent = `XP: ${this._player.stats.health} / ${this._player.stats.healthMax}`;

        this._healthText.setText(healthContent);
    }
    //#endregion

    //#region Internal methods
    protected createWindow() {
        super.createWindow(); 

        const statusConfiguration = (<StatusPlayerBoxConfiguration> this.configuration).healthBarBox;
        this.scene.statusBarManager.addOne(statusConfiguration);

        this.createOuterWindow(this.configuration.position.x, 
                               this.configuration.position.y, 
                               this.configuration.position.width, 
                               this.configuration.position.height);

        this.createInnerWindow(this.configuration.position.x, 
                                this.configuration.position.y, 
                                this.configuration.position.width, 
                                this.configuration.position.height);

        this.displayerStatsOf(this._player, this.configuration.position);

        this.createPeopleBox(this._player.prefabAvatar, 
                            this.configuration.position.x - 50, 
                            this.configuration.position.y, 
                            this.configuration.position.width, 
                            this.configuration.position.height);
    }

    private displayerStatsOf(player: PlayerData, currentPosition: Position) {
        this._healthText = this.scene.make.text({
            x: currentPosition.x + 150,
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