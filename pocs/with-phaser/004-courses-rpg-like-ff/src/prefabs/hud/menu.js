import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Menu extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods
    /**
     * Enables or disables menu items
     * @param {bool} state 
     */ 
    enable(state) {
        this.items.forEach(item => {
            item.setInteractive(state);
            item.setVisible(state);
        }, this);
    }  
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
    
        this.prepare(properties);
    }   
    //#endregion

    //#region internal methods
    /**
     * Prepares menu with items in properties array
     */    
    prepare(properties) {
        this.items = [];

        for (const name in properties.menuItems) {
            if (properties.menuItems.hasOwnProperty(name))  {
                const menuItem = this.scene.createPrefab(name, properties.menuItems[name]);

                this.items.push(menuItem);
            }
        }

        this.enable(false);
    }
    //#endregion
}

export default Menu;