import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseScene } from "./base.scene";
import { LevelConfig } from "../models/levels/level-config";
import { Dictionary } from "../../shared/custom-types/dictionary";
import { PrefabSpriteFactory } from "../prefab-sprites/prefab-sprite-factory";
import { SceneData } from "../models/scenes/scene-data";
import { LevelManageService } from '../../shared/services/level-manager.service';

/**
* Base level scene : abstract class of all active map scenes
* Data are incoming from json file, loading in client cache
*/
export abstract class BaseLevelScene extends BaseScene {
    //#region fields    
    private _keyListeners = ['Down', 'Up'];

    private _physicalGroups: Dictionary<Phaser.Physics.Arcade.Group> = {};
    private _prefabSprites: Dictionary<Phaser.GameObjects.GameObject> = {};
    //#endregion
    
    constructor(key: string, protected _logger: DefaultLogger, protected _levelManager: LevelManageService) {
        super(key, _logger, _levelManager);
    }
    
    //#region public methods
    create() {
        this.manageKeyEvents();

        this.createCollisionGroups();
        this.createAllPrefabSprites();
    }
    
    update() {
       this.updateAllPrefabs();
    }
    
    /**
    * Attach an action from event
    * @param item Event key
    * @param callback Action to launch
    */
    attachActionToKeyboardEvent(item: string, callback: Function) {
        const event = 'key' + item.toLowerCase();
        this.input.keyboard.on(event, callback, this);
    }
    
    /**
     * Removes all event listeners 
     * @param item event key as a string
     */
    removeAllKeyboardListener(item: string) {
        const event = 'key' + item.toLowerCase();
        this.input.keyboard.removeAllListeners(event);
    }
    
    /**
    * Updates all child prefabs
    */
    updateAllPrefabs() {
        this._logger.log('updateAllPrefabs');
        for (const key in this.prefabSprites) {
            if (this.prefabSprites.hasOwnProperty(key)) {
                const sprite = this.prefabSprites[key];
                sprite.update();
            }
        }
    }

    /**
     * Get video asset by key string
     * @param key string to find asset
     */
    getVideoByKey(key: string) {
        const videoAsset = this.configData.assets.videos.find((video) => video.key === key, this);

        if (! videoAsset) {
            throw new Error(`Video with key ${key} is missing`);
        }

        return videoAsset;
    }
    //#endregion
    
    //#region internal methods
    private manageKeyEvents() {
        this._keyListeners.forEach((key) => {
            this.removeAllKeyboardListener(key);
            this.configEventsToListen(key);
        }, this);
    }

    /**
     * Override this method to add event listeners 
     */
    protected configEventsToListen(currentKeyEvent: string) {
        const method = this[`onKey${currentKeyEvent}`];
        this.attachActionToKeyboardEvent(currentKeyEvent, method);
    }
    
    /**
     * Override this method to manage key up listener
     */
    protected onKeyUp(event: KeyboardEvent) {
        throw new Error('Children class may overrides me');
    }

    /**
     * Override this method to manage key down listener
     */
    protected onKeyDown(event: KeyboardEvent) {
        throw new Error('Children class may overrides me');
    }

    private createCollisionGroups() {
        this.levelConfig.data.groups.forEach((groupName) => {
            this.physicalGroups[groupName] = this.physics.add.group();
        }, this);
    }
    
    private createAllPrefabSprites() {
        this.levelConfig.data.prefabs.forEach((prefab) => {
            const sprite = PrefabSpriteFactory.create(prefab.type, this, prefab.key, prefab.position, prefab.properties);
            this.saveSpriteInScene(sprite, prefab.properties.group, prefab.key);
        }, this);
    }
    
    /**
     * Adds the sprite in the scene, and group collision
     * @param sprite Creating sprite to add in scene
     * @param group Group collision name
     * @param key Key as name
     */
    protected saveSpriteInScene(sprite, group: string, key: string) {
        if (sprite) {
            this.physicalGroups[group].add(sprite);
            this.prefabSprites[key] = sprite;            
        }
    }
    //#endregion
    
    //#region properties
    /**
    * Gets groups list
    */
    public get physicalGroups(): Dictionary<Phaser.Physics.Arcade.Group> {
        return this._physicalGroups;
    }
    
    /**
    * Gets prefab sprite list
    */
    public get prefabSprites(): Dictionary<Phaser.GameObjects.GameObject> {
        return this._prefabSprites;
    }
    //#endregion
}