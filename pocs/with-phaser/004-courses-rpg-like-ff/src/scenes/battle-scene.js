import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import Unit from '../prefabs/battle/unit';
import PriorityQueue from '../../node_modules/js-priority-queue/priority-queue.min';

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

    /**
     * Launchs new turn of attack in battle scene, thanks to queue
     */
    goToNextTurn() {
        this.currentUnit = this.units.dequeue();

        if (this.currentUnit.active) {
            this.currentUnit.attack();
            this.currentUnit.calculateAttackTurn();
            this.units.queue(this.currentUnit);
        } else {
            this.currentUnit = undefined;
            this.goToNextTurn();
        }
    }
    //#endregion
    
    //#region internal methods
    setPrefabs() {
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            playerUnit: Unit.prototype.constructor,
            enemyUnit: Unit.prototype.constructor,
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