import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import Attack from '../battle/physical-attack';
import AttackMenuItem from './attack-menu-item';
import MagicalAttack from '../battle/magical-attack';

/**
 * It represents a specific menu item, to attack in a fight
 */
class MagicalAttackMenuItem extends AttackMenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.MANA_COST = 10;
    }

    /**
     * Selects one menu
     */
    select() {
        const manaIsEnabled = this.scene.currentUnit.stats.mana >= this.MANA_COST;

        if (manaIsEnabled) {
            this.setNewAttack();
        }
    }

    getAttackInstance(key, position, setting) {
        setting.manaCost = this.MANA_COST;

        return new MagicalAttack(this.scene, key, position, setting);
    }
    //#endregion
}

export default MagicalAttackMenuItem;