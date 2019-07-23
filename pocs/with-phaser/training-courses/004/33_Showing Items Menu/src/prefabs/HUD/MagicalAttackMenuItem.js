import Prefab from '../Prefab';
import MenuItem from './MenuItem';
import MagicalAttack from '../battle/MagicalAttack';

class MagicalAttackMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.MANA_COST = 10;
    }
    
    select () {
        if (this.scene.current_unit.stats.mana >= this.MANA_COST) {
            this.scene.current_attack = new MagicalAttack(this.scene, this.scene.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", owner:         this.scene.current_unit, mana_cost: this.MANA_COST});

            this.scene.prefabs.actions_menu.enable(false);
            this.scene.prefabs.enemy_units_menu.enable(true);
        }
    }
}

export default MagicalAttackMenuItem;
