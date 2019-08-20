import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Unit from './unit';

/**
 * Enemy unit (during a battle)
 */
class PlayerUnit extends Unit {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.experience = 0;
        this.currentLevel = 0;

        this.faceTexture = properties.faceTexture;
    }

    //#region public methods  
    /**
     * Launches an attack, or choose an element (potion, ...)
     */
    playAction() {
        this.scene.activateActionsMenu();
    }

    /**
     * Upgrades experience 
     * @param {number} value 
     */
    receiveExperience(value) {
        this.experience += value;
        this.verifyLevel();
    }
    //#endregion

    //#region internal methods
    updateStatusBar() {
        this.scene.prefabs.showPlayerUnit.change(this, this.faceTexture);
    }

    /**
     * Verifies level value, and updates if necessary
     */
    verifyLevel() {
        const levelData = this.scene.experienceTable[this.currentLevel];

        if (this.experience >= levelData.requiredExperience) {
            this.goToNextLevel();
            this.upgradeStats(levelData);
        }
    }

    /**
     * Go to the next level
     */
    goToNextLevel() {
        this.currentLevel++;
        this.experience = 0;
    }

    /**
     * Update stats from new level
     * @param {JSON} levelData 
     */
    upgradeStats(levelData) {
        console.log('upgradeStats::0', this.stats);

        for (let stat in levelData.statsIncrease) {
            this.stats[stat] += levelData.statsIncrease[stat];
        }

        console.log('upgradeStats::1', this.stats);
    }
    //#endregion
}

export default PlayerUnit;