import { Position } from '../models/position';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalWithPrefabPlugin } from './base-modal-with-prefab.plugin';
import { StatusPlayerBoxConfiguration } from '../models/statusBar/status-player-box-configuration';
import { StatusBarType } from '../../shared/enums/status-bar-type';
import { StatusBarPlugin } from './status-bar.plugin';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { StatusBarContent } from '../models/statusBar/status-bar-content';

/** Plugin to display one box with stats of one player */
export class StatsUnitBoxPlugin extends BaseModalWithPrefabPlugin {
    //#region Fields
    private _statusBarList: Dictionary<StatusBarPlugin> = {};
    private _content: StatusBarContent = null;
    private _timedEvent: Phaser.Time.TimerEvent;
    private _currentDisplayingHealth = 0;
    private _updateStepValue = 5;
    //#endregion

    constructor(data: StatusBarContent,
                protected _scene: BaseMapLevelScene, 
                protected _pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, _pluginManager);

        this._content = Object.assign({}, data);
    }

    //#region Public methods
    public toggleWindow(visibility: boolean) {
        super.toggleWindow(visibility);
    }

    /** Displays new values of stats of the current player */
    public refresh() {
        for (const key in this._statusBarList) {
            // TODO: 17/02/2020, see how to pass the values for each statusType (xp, mp, ...)
            this._statusBarList[key].update(this._content.healthValue, this._content.healthMaxValue);
        }
    }

    /** 
     * Reinit all data in the box 
     * @param withAnimation True if you want to animate the reinit data
     */
    public reinitData(data: StatusBarContent, withAnimation: boolean = true) {
        let action = this.updateValues;

        this._currentDisplayingHealth = 0;
        if (withAnimation) {
            action = this.displayReinitData;
        }

        action.call(this, data);
    }

    /** Updates values in the status bar box */
    public updateValues(data: StatusBarContent) {
        this._content = Object.assign({}, data);
        this.refresh();
    }
    //#endregion

    //#region Internal methods
    private displayReinitData(data: StatusBarContent) {
        if (this._timedEvent) {
            this._timedEvent.remove();
        } 

        this._timedEvent = this.scene.time.addEvent({
            delay: 50,
            callback: this.animateData.bind(this, data),
            callbackScope: this,
            loop: true
        }); 
    }

    private animateData(data: StatusBarContent) {
        this._currentDisplayingHealth += this._updateStepValue;
        this._statusBarList[StatusBarType.xp].update(this._currentDisplayingHealth, data.healthMaxValue);

        if (this._currentDisplayingHealth >= data.healthMaxValue) {
            this._timedEvent.remove();
        }
    }

    protected createBox() {
        super.createBox(); 

        this.createOuterBox(this.configuration.position.x, 
                               this.configuration.position.y, 
                               this.configuration.position.width, 
                               this.configuration.position.height);

        this.createInnerBox(this.configuration.position.x, 
                                this.configuration.position.y, 
                                this.configuration.position.width, 
                                this.configuration.position.height);
                                
        this.createPeopleBox(this._content.prefabAvatar, 
                            this.configuration.position.x - 50, 
                            this.configuration.position.y, 
                            this.configuration.position.width, 
                            this.configuration.position.height);

        this.displayerStatsOf(this._content, this.configuration.position);
    }

    private displayerStatsOf(data: StatusBarContent, currentPosition: Position) {
        this.displayHealthStatus(data, currentPosition);
        this.refresh();
    }

    private displayHealthStatus(data: StatusBarContent, currentPosition: Position) {
        this.displayOneStatusBar(StatusBarType.xp, data, currentPosition);
    }

    private displayOneStatusBar(type: StatusBarType, data: StatusBarContent, currentPosition: Position) {
        const statusPositionX = currentPosition.x + this.currentPrefab.displayWidth;
        const statusPositionY = currentPosition.y + 40;

        const statusConfiguration = (<StatusPlayerBoxConfiguration> this.configuration).healthBarBox;

        statusConfiguration.key = type + '_box_' + data.key; 
        statusConfiguration.position.x = statusPositionX;
        statusConfiguration.position.y = statusPositionY;

        statusConfiguration.type = type;

        const bar = new StatusBarPlugin(this._scene, this._pluginManager);
        bar.init(statusConfiguration);

        this._statusBarList[type] = bar;
    }
    //#endregion
}