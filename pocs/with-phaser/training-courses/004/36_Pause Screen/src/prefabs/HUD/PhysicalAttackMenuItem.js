import Prefab from '../Prefab';
import MenuItem from './MenuItem';
import PhysicalAttack from '../battle/PhysicalAttack';

class PhysicalAttackMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }
    
    select () {
        this.scene.current_attack = new PhysicalAttack(this.scene, this.scene.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", owner:         this.scene.current_unit});

        this.scene.prefabs.actions_menu.enable(false);
        this.scene.prefabs.enemy_units_menu.enable(true);
    }
}

export default PhysicalAttackMenuItem;
