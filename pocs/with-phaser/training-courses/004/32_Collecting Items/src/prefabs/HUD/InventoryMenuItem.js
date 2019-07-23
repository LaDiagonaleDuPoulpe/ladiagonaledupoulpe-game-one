import Prefab from '../Prefab';
import MenuItem from './MenuItem';

class InventoryMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }
    
    select () {
        console.log(this.scene.cache.game.inventory.items);
    }
}

export default InventoryMenuItem;
