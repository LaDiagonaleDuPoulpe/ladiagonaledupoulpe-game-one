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
        this.prepareGamingQueue();
    }

    init(data) {
        super.init(data);

        this.previousLevel = data.extraParameters.previousLevel;
    }

    /**
     * Stops battle, and go back to map
     */
    backToWorld() {
        this.scene.start('BootScene', { scene: this.previousLevel });
    }

    /**
     * Launchs new turn of attack in battle scene, thanks to queue
     */
    goToNextTurn() {
        this.currentUnit = this.units.dequeue();

        if (this.currentUnit.active) {
            this.currentUnit.playAction();
            this.currentUnit.calculateAttackTurn();
            this.units.queue(this.currentUnit);
        } else {
            this.currentUnit = undefined;
            this.goToNextTurn();
        }

        console.log('next turn', this.units);
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