import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import UnitStats from '../prefabs/hud/unit-stats';

/**
 * Scene displaying resume of a fight
 */
class PauseScene extends JSonLevelScene {
    constructor() {
        super('PauseScene');
    }

    //#region public methods
    init(data) {
        super.init(data);

        this.previousLevel = data.extraParameters.previousLevel;
    }

    /**
     * Stops pause, and go back to map
     */
    backToWorld() {
        this.scene.start('BootScene', { scene: this.previousLevel });
    }

    create() {
        super.create();
        this.getDefaultDataParty();
    }
    //#endregion

    //#region internal methods
    /**
         * Loads party data from cache (prefabs stats)
         */
    loadPartyData() {
        for (let unitDataKey in this.cache.game.partyData) {
            const cacheDataUnit = this.cache.game.partyData[unitDataKey];
            this.prefabs[unitDataKey].stats = {};

            for (let statKey in cacheDataUnit.stats) {
                this.prefabs[unitDataKey].stats[statKey] = cacheDataUnit.stats[statKey] + cacheDataUnit.statsBonus[statKey];
            }
            this.prefabs[unitDataKey].experience = cacheDataUnit.experience;
            this.prefabs[unitDataKey].currentLevel = cacheDataUnit.currentLevel;
        }

        console.log('loadPartyData::warrior.stats', this.prefabs.warrior.stats);
    }

    /**
     * Loads default data of the party
     */
    loadDefaultDataParty() {
        this.load.json('default_data', 'assets/levels/default_data.json');
    }

    getDefaultDataParty() {
        this.cache.game.partyData = this.cache.json.get('default_data');
    }

    setPrefabs() {
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            unitStats: UnitStats.prototype.constructor
        };
    }
    //#endregion
}

export default PauseScene;