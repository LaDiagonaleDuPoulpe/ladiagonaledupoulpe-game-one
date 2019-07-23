import Item from './prefabs/battle/Item';

class Inventory {
    constructor() {
        this.items = [];
        
        this.item_classes = {
            "potion": Item.prototype.constructor
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
}

export default Inventory;