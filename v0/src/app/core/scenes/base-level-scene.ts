import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseScene } from "./base-scene";
import { LevelConfig } from "../models/level-config";
import { Dictionary } from "../../shared/custom-types/dictionary";
import { PrefabSpriteFactory } from "../prefab-sprites/prefab-sprite-factory";
import { SceneData } from "../models/scene-data";

/**
* Base level scene : abstract class of all active map scenes
* Data are incoming from json file, loading in client cache
*/
export abstract class BaseLevelScene extends BaseScene {
    //#region fields    
    private _levelConfig: LevelConfig;
    private _physicalGroups: Dictionary<Phaser.Physics.Arcade.Group> = {};
    private _prefabSprites: Dictionary<Phaser.GameObjects.GameObject> = {};
    //#endregion
    
    constructor(key: string, protected _logger: DefaultLogger) {
        super(key, _logger);
    }
    
    //#region public methods
    create() {
        this.createCollisionGroups();
        this.createAllPrefabSprites();
    }
    
    update() {
       this.updateAllPrefabs();
    }
    
    init(config: LevelConfig) {
        this._levelConfig = config;
    }
    
    /**
    * Attach an action from event
    * @param item Event key
    * @param callback Action to launch
    */
    attachActionToKeyboardEvent(item: string, callback: Function) {
        this.input.keyboard.on('key' + item, callback, this);
    }
    
    /**
    * Removes all event listeners 
    * @param item event key as a string
    */
    removeAllKeyboardListener(item: string) {
        this.input.keyboard.removeAllListeners('key' + item);
    }
    
    /**
    * Updates all child prefabs
    */
    updateAllPrefabs() {
        for (const key in this.prefabSprites) {
            if (this.prefabSprites.hasOwnProperty(key)) {
                const sprite = this.prefabSprites[key];
                sprite.update();
            }
        }
    }
    //#endregion
    
    //#region internal methods
    private createCollisionGroups() {
        this._levelConfig.data.groups.forEach((groupName) => {
            this.physicalGroups[groupName] = this.physics.add.group();
        }, this);
    }
    
    private createAllPrefabSprites() {
        this._levelConfig.data.prefabs.forEach((prefab) => {
            const sprite = PrefabSpriteFactory.create(prefab.type, this, prefab.key, prefab.position, prefab.properties);
            
            this.add.existing(sprite);
            this.physicalGroups[prefab.properties.group].add(sprite);
            
            this.prefabSprites[prefab.key] = sprite;            
        }, this);
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
    
    /**
    * Gets scene data (from json file)
    */
    public get configData(): SceneData {
        return this._levelConfig.data;
    }
    
    
    //#endregion
}