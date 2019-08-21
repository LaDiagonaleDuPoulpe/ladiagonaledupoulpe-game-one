import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Unit from './unit';
import PhysicalAttack from './physical-attack';

/**
 * Enemy unit (during a battle)
 */
class EnemyUnit extends Unit {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods  
    /**
     * Launches an attack 
     */
    playAction() {
        this.playActionWithAttack(this.attack);
    }

    /**
     * Destroys enemy unit
     */
    destroy() {
        if (this.active) {
            const menuItem = this.scene.prefabs[this.name + 'Item'];
            if (menuItem) {
                menuItem.destroy();
            }
            super.destroy();
        }
    }
    //#endregion

    //#region protected methods
    /**
     * Plays an action to attack or choose item
     * @param {Attack} attackAction 
     */
    playActionWithAttack(attackAction) {
        this.scene.prefabs.showPlayerUnit.display(false);
        const target = this.chooseTarget();
        attackAction.hit(target);
    }

    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.targetUnits = properties.targetUnits;

        this.prepareAttack();
    }
    //#endregion

    //#region internal methods
    prepareAttack() {
        const key = this.name + '_' + 'attack';
        const position = { x: 0, y: 0 };
        const setting = {
            group: 'attacks',
            owner: this
        };

        this.attack = new PhysicalAttack(this.scene, key, position, setting);
    }

    /**
     * Chooses a target to attack
     */
    chooseTarget() {
        return this.getActiveUnit();
    }

    /**
     * Gets active unit in battle scene
     */
    getActiveUnit() {
        const targetGroup = this.scene.groups[this.targetUnits];
        const targetIndex = this.scene.random.between(0, targetGroup.countActive() - 1);
        let target = undefined;

        let i = 0;
        targetGroup.children.each(unit => {
            if (unit.active) {
                if (i == targetIndex) {
                    target = unit;
                }
                i++;
            }
        }, this);


        return target;
    }
    //#endregion
}

export default EnemyUnit;