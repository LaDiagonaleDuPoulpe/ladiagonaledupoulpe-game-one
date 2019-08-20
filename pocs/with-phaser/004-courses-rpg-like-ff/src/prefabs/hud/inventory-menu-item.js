import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import PhysicalAttack from '../battle/physical-attack';

/**
 * It represents a specific menu item, when you want to get items
 */
class InventoryMenuItem extends MenuItem {

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
        if (this.scene.cache.game.inventory.hasItems()) {
            this.scene.prefabs.actionsMenu.enable(false);
            this.scene.prefabs.itemsMenu.enable(true);
        }
    }
    //#endregion
}

export default InventoryMenuItem;