import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import Unit from '../prefabs/battle/unit';
import PriorityQueue from '../../node_modules/js-priority-queue/priority-queue.min';
import MenuItem from '../prefabs/hud/menu-item';
import Menu from '../prefabs/hud/menu';
import PlayerUnit from '../prefabs/battle/player-unit';
import EnemyUnit from '../prefabs/battle/enemy-unit';
import PhysicalAttackMenuItem from '../prefabs/hud/physical-attack-menu-item';
import EnemyMenuItem from '../prefabs/hud/enemy-menu-item';
import MagicalAttackMenuItem from '../prefabs/hud/magical-attack-menu-item';
import RunMenuItem from '../prefabs/hud/run-menu-item';

/**
 * Scene displaying title and starts game after clicked on it
 */
class BattleScene extends JSonLevelScene {
    constructor() {
        super('BattleScene');
        this.random = new Phaser.Math.RandomDataGenerator();
    }

    //#region public methods
    create() {
        super.create();
        this.getExperienceTable();
        this.createAllEnemies();
        this.prepareGamingQueue();
    }

    init(data) {
        super.init(data);

        this.previousLevel = data.extraParameters.previousLevel;
        this.encounter = data.extraParameters.encounter;
    }

    preload() {
        this.loadExperienceTable();
    }

    /**
     * Stops battle, and go back to map
     */
    backToWorld() {
        this.scene.start('BootScene', { scene: this.previousLevel });
    }

    /**
     * Launches new turn of attack in battle scene, thanks to queue
     */
    goToNextTurn() {
        let nextTurnIsValid = true;

        if (this.groups.enemyUnits.countActive() === 0) {
            this.endBattle();
            nextTurnIsValid = false;
        } 

        if (this.groups.playerUnits.countActive() === 0) {
            this.gameOver();
            nextTurnIsValid = false;
        }

        if (nextTurnIsValid) {
            this.currentUnit = this.units.dequeue();

            if (this.currentUnit.active) {
                this.currentUnit.playAction();
                this.currentUnit.calculateAttackTurn();
                this.units.queue(this.currentUnit);
            } else {
                this.currentUnit = undefined;
                this.goToNextTurn();
            }
        }
    }
    
    /**
     * Activates the actions menu
     * @param {boolean} enable 
     */
    activateActionsMenu(enable) {
        this.setEnableMenu(this.prefabs.actionsMenu, enable);
    }

    /**
     * Activates the enemies menu
     * @param {boolean} enable 
     */
    activateEnemysMenu(enable) {
        this.setEnableMenu(this.prefabs.enemyUnitsMenu, enable);
    }
    //#endregion
    
    //#region internal methods
    getExperienceTable() {
        this.experienceTable = this.cache.json.get('experience_table');
    }

    loadExperienceTable() {
        this.load.json('experience_table', 'assets/levels/experience_table.json');
    }

    /**
     * All enemy units are killed
     */
    endBattle() {
        this.giveMoreExperienceToUnits();
        this.backToWorld();
    }

    /**
     * Iterates units and gives experiences
     */
    giveMoreExperienceToUnits() {
        const receivedExperience = this.encounter.rewars.experience;

        this.groups.playerUnits.children.each(unit => {
            const addingExperience = receiveExperience / this.groups.playerUnits.children.size;
            unit.receiveExperience(addingExperience);
        }, this);
    }

    /**
     * All player units are killed
     */
    gameOver() {
        this.scene.start('BootScene', { scene: 'title' });
    }

    /**
     * Creates all enemy prefabs
     */
    createAllEnemies() {
        for (let key in this.encounter.enemyData) {
            this.createPrefab(key, this.encounter.enemyData[key]);
        }
    }

    setEnableMenu(menu, enable) {
        if(typeof(enable) == "undefined") {
            enable = true;
        }

        menu.enable(enable);
    }

    setPrefabs() {
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            playerUnit: PlayerUnit.prototype.constructor,
            enemyUnit: EnemyUnit.prototype.constructor,
            menuItem: MenuItem.prototype.constructor,
            physicalAttackMenuItem: PhysicalAttackMenuItem.prototype.constructor,
            enemyMenuItem: EnemyMenuItem.prototype.constructor,
            magicalAttackMenuItem: MagicalAttackMenuItem.prototype.constructor,
            runMenuItem: RunMenuItem.prototype.constructor,
            menu: Menu.prototype.constructor
        };
    }

    prepareGamingQueue() {
        this.units = new PriorityQueue({
            comparator: (unitA, unitB) => {
                return unitA.attackTurn - unitB.attackTurn;
            }
        });

        this.calculateTurnForAllGroup(this.groups.playerUnits, 0);
        this.calculateTurnForAllGroup(this.groups.enemyUnits, 0);
    
        this.goToNextTurn();
    }

    calculateTurnForAllGroup(unitGroup, turn) {
        unitGroup.children.each(unit => {
            unit.calculateAttackTurn(turn);
            this.units.queue(unit);
        });
    }
    //#endregion
}

export default BattleScene;