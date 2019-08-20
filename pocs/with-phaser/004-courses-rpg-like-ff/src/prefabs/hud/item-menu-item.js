import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import PhysicalAttack from '../battle/physical-attack';

/**
 * It represents a specific menu item, when you want to select one item
 */
class ItemMenuItem extends MenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods   
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.itemName = properties.itemName;
        this.amount = properties.amount;
    }

    /**
     * Selects one menu
     */
    select() {
        console.log('select item menu item', this.itemName);
    }
    //#endregion
}

export default ItemMenuItem;