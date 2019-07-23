import Prefab from '../Prefab';
import MenuItem from './MenuItem';

class ItemMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.item_name = properties.item_name;
    }
    
    select () {
        console.log("using " + this.item_name);
    }
}

export default ItemMenuItem;
