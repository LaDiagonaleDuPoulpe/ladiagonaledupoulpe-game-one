import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import PhysicalAttack from '../battle/physical-attack';

/**
 * It represents a specific menu item, to attack in a fight
 */
class AttackMenuItem extends MenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods   
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
    }

    /**
     * Selects one menu
     */
    select() {
        this.setNewAttack();
    }

    /**
     * Sets new attack item (a new turn)
     */
    setNewAttack() {
        const position = {
            x: 0,
            y: 0
        };
        const setting = {
            group: 'attacks',
            owner: this.scene.currentUnit
        };

        const key = this.scene.currentUnit.name + '_' + 'attack';
        this.scene.currentAttack = this.getAttackInstance(key, position, setting);

        this.scene.activateActionsMenu(false);
        this.scene.activateEnemysMenu(true);
    }

    /**
     * Gets attack instance
     * @param {string} key 
     * @param {position} position 
     * @param {properties} setting 
     */
    getAttackInstance(key, position, setting) {
        return new PhysicalAttack(this.scene, key, position, setting);
    }    
    //#endregion
}

export default AttackMenuItem;