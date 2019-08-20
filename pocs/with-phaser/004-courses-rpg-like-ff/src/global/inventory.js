import Item from "../prefabs/battle/item";

/**
 * Allosw you to collect items in the game
 */
class Inventory {
    constructor() {
        this.items = [];

        this.itemClasses = {
            "potion": Item.prototype.constructor
        };
    }

    //#region public methods
    /**
     * Creates the menu in the specific scene, and binds it with items
     * @param {Scene} scene 
     * @param {menu} itemsMenu 
     * @todo Moves all the code in ItemsMenu, it have to be there !!
     */
    createMenu(scene, itemsMenu) {
        const itemPosition = {
            x: itemsMenu.x,
            y: itemsMenu.y
        };

        for (let itemType in this.items) {
            const prefab = this.items[itemType].prefab;
            const amount = this.items[itemType].amount;
            
            const name = itemType + 'MenuItem';
            const setting = {
                group: 'hud',
                texture: prefab.itemTexture,
                itemName: itemType,
                amount: amount
            };

            const menuItem = new ItemMenuItem(scene, name, itemPosition, setting);
            menuItem.setOrigin(0);

            itemsMenu.items.push(menuItem);
        }

        itemsMenu.enable(false);
    }

    /**
     * Collects a new item from a scene
     */
    collect(scene, item) {
        this.updateQuantity(item, 1, scene);
    }
    //#endregion

    //#region internal methods
    /**
     * Updates quantity of a type of item
     * @param {string} type 
     * @param {number} newValue 
     */
    updateQuantity(item, newValue, scene) {
        if (this.items[item.type]) {
            this.items[item.type].amount += newValue;
        } else {
            const position = {
                x: 0,
                y: 0
            };
            const newItem = new this.itemClasses[item.type](scene, item.type, position, item.properties);
            this.items[item.type] = {
                prefab: newItem,
                amount: 1
            };
        }
    }
    //#endregion
}

export default Inventory;