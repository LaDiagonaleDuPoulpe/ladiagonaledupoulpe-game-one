import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseScene } from "./base-scene";
import { LevelConfig } from "../models/level-config";
import { Dictionary } from "../../shared/custom-types/dictionary";
import { PrefabSpriteFactory } from "../prefab-sprites/prefab-sprite-factory";

/**
 * Base level scene : abstract class of all active map scenes
 * Data are incoming from json file, loading in client cache
 */
export abstract class BaseLevelScene extends BaseScene {
    //#region fields
    private _levelConfig: LevelConfig;
    private _physicalGroups: Dictionary<Phaser.Physics.Arcade.Group> = {};
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

    }

    init(config: LevelConfig) {
        this._levelConfig = config;
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
    //#endregion
}