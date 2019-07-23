import Prefab from '../Prefab';

class Menu extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.menu_items = [];
        for (let menu_item_name in properties.menu_items) {
            let new_item = this.scene.create_prefab(menu_item_name, properties.menu_items[menu_item_name]);
            this.menu_items.push(new_item);
        }
        
        this.enable(false);
    }
    
    enable (enable) {
        this.menu_items.forEach(function (menu_item) {
            if (menu_item.active) {
                menu_item.setInteractive(enable);
                menu_item.setVisible(enable);
            }
        }, this);
    }
    
}

export default Menu;