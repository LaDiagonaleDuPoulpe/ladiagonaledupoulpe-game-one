import Item from './prefabs/battle/Item';
import Potion from './prefabs/battle/Potion';
import ItemMenuItem from './prefabs/HUD/ItemMenuItem';

class Inventory {
    constructor() {
        this.items = [];
        
        this.item_classes = {
            "potion": Potion.prototype.constructor
        };
    }
    
    collect_item (scene, item_object) {
        if (this.items[item_object.type]) {
            this.items[item_object.type].amount += 1;
        } else {
            let item = new this.item_classes[item_object.type](scene, item_object.type, {x: 0, y: 0}, item_object.properties);
            this.items[item_object.type] = {prefab: item, amount: 1};
        }
    }
    
    create_menu (scene, items_menu) {
        let item_position = {x: items_menu.x, y: items_menu.y};
        for (let item_type in this.items) {
            let item_prefab = this.items[item_type].prefab;
            let item_amount = this.items[item_type].amount;
            let menu_item = new ItemMenuItem(scene, item_type + "_menu_item", {x: item_position.x, y: item_position.y}, 
            {group: "hud", texture: item_prefab.item_texture, item_name: item_type, amount: item_amount});
            menu_item.setOrigin(0);
            items_menu.menu_items.push(menu_item);
        }

        items_menu.enable(false);
    }
    
    has_items () {
        for (let item_type in this.items) {
            if (this.items[item_type].amount > 0) {
                return true;
            }
        }
        return false;
    }

    has_item (item_type) {
        return this.items[item_type].amount > 0;
    }

    use_item (item_type, target) {
        this.items[item_type].prefab.use(target);
        this.items[item_type].amount -= 1;
    }
}

export default Inventory;
