import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import Attack from '../battle/attack';

/**
 * It represents a specific menu item, to attack in a fight
 */
class PhysicalAttackMenuItem extends MenuItem {
    
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
        const position = {
            x: 0,
            y: 0
        };
        const setting = {
            group: 'attacks',
            owner: this.scene.currentUnit
        };

        const key = this.scene.currentUnit.name + '_' + 'attack';
        this.scene.currentAttack = new Attack(this.scene, key, position, setting);
    
        this.scene.activateActionsMenu(false);
        this.scene.activateEnemysMenu(true);

    }
    //#endregion
}

export default PhysicalAttackMenuItem;