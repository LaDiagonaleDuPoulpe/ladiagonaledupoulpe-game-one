import Prefab from '../Prefab';
import MenuItem from './MenuItem';

class InventoryMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }
    
    select () {
        if (this.scene.cache.game.inventory.has_items()) {
            this.scene.prefabs.actions_menu.enable(false);
            this.scene.prefabs.items_menu.enable(true);
        }
    }
    
}

export default InventoryMenuItem;