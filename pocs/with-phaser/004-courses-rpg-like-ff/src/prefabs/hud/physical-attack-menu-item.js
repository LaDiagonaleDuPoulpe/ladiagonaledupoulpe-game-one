import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import Attack from '../battle/physical-attack';
import AttackMenuItem from './attack-menu-item';

/**
 * It represents a specific menu item, to attack in a fight
 */
class PhysicalAttackMenuItem extends AttackMenuItem {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
    }     
    //#endregion
}

export default PhysicalAttackMenuItem;