import { Position } from '../models/position';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalWithPrefabPlugin } from './base-modal-with-prefab.plugin';
import { StatusUnitBoxConfiguration } from '../models/statusBar/status-unit-box-configuration';
import { StatusBarType } from '../../shared/enums/status-bar-type';
import { StatusBarPlugin } from './status-bar.plugin';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { StatusBarContent } from '../models/statusBar/status-bar-content';
import QuantityStatisticItem from '../models/game/quantity-statistic-item';

/** Plugin to display one box with stats of one player */
export class StatsUnitBoxPlugin extends BaseModalWithPrefabPlugin {
    //#region Fields
    private _statusBarList: Dictionary<StatusBarPlugin> = {};
    private _content: StatusBarContent = null;
    private _timedEvents: Dictionary<Phaser.Time.TimerEvent> = {};
    private _currentDisplayingValues: Dictionary<number> = {};
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
            const type = key as StatusBarType;
            const currentContent = this._content.contents[type];

            this._statusBarList[key].update(currentContent.quantity, currentContent.max);
        }
    }

    /** 
     * Reinit all data in the box 
     * @param withAnimation True if you want to animate the reinit data
     */
    public reinitData(data: StatusBarContent, withAnimation: boolean = true) {
        let action = this.updateValues;

        this.reinitValuesFromTimers(data);

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
    private reinitValuesFromTimers(data: StatusBarContent) {
        for (const key in data.contents) {
            this._currentDisplayingValues[key] = 0;
        }
    }

    private displayReinitData(data: StatusBarContent) {
        for(var key in data.contents) {
            const event = this._timedEvents[key];
            if (event) {
                event.remove();
            }

            this._timedEvents[key] = this.scene.time.addEvent({
                delay: 50,
                callback: this.animateData.bind(this, key, data.contents[key]),
                callbackScope: this,
                loop: true
            }); 
        }
    }

    private animateData(key: string, data: QuantityStatisticItem) {
        this._currentDisplayingValues[key] += this._updateStepValue;

        const type = key as StatusBarType;
        this._statusBarList[type].update(this._currentDisplayingValues[key], data.max);

        if (this._currentDisplayingValues[key] >= data.max) {
            this._timedEvents[key].remove();
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

        this.displayerStatsOf(this._content, this.configuration as StatusUnitBoxConfiguration);
    }

    private displayerStatsOf(data: StatusBarContent, configuration: StatusUnitBoxConfiguration) {
        const statKeys = Object.keys(data.contents);

        let positionY = configuration.position.y;
        for(var key of statKeys) {
            const statusBarPosition = {...configuration.statusBoxes[key].position};

            statusBarPosition.y = positionY;
            statusBarPosition.x = configuration.position.x;
            
            this.displayOneStatusBar(key as StatusBarType, data.key, statusBarPosition);
            
            positionY += configuration.statusBoxes[key].position.height + 15;
        }

        this.refresh();
    }

    private displayOneStatusBar(type: StatusBarType, key: string, currentPosition: Position) {
        const statusPositionX = currentPosition.x + this.currentPrefab.displayWidth;
        const statusPositionY = currentPosition.y + 10;

        const statusConfiguration = (<StatusUnitBoxConfiguration> this.configuration)['statusBoxes'][type];

        statusConfiguration.key = type + '_box_' + key; 
        statusConfiguration.position.x = statusPositionX;
        statusConfiguration.position.y = statusPositionY;

        statusConfiguration.type = type;

        const bar = new StatusBarPlugin(this._scene, this._pluginManager);
        bar.init(statusConfiguration);

        this._statusBarList[type] = bar;
    }
    //#endregion
}