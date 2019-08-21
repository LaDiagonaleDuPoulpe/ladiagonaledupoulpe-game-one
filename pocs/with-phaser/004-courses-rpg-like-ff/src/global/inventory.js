import firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

import Item from "../prefabs/battle/item";
import ItemMenuItem from "../prefabs/hud/item-menu-item";
import Unit from "../prefabs/battle/unit";
import Potion from "../prefabs/battle/potion";


/**
 * Allosw you to collect items in the game
 */
class Inventory {
    constructor() {
        this.items = [];

        this.itemClasses = {
            "potion": Potion.prototype.constructor
        };
    }

    //#region public methods
    /**
     * Allows you to know if there is at least one item by type
     * @param {string} type
     * @returns {boolean} true or false
     */
    hasItem(type) {
        return this.items[type].amount > 0;
    }

    /**
     * Use one item of a specific type
     * @param {string} type 
     * @param {Unit} target 
     */
    useItem(type, target) {
        this.items[type].prefab.use(target);
        this.items[type].amount--;

        const key = this.items[type].keys.pop();
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/items/' + key)
                           .remove();
    }

    /**
     * Allows you to know if there is items in the array list
     * @returns {boolean}
     */
    hasItems() {
        for (let type in this.items) {
            if (this.items[type].amount > 0) {
                return true;
            }
        }

        return false;
    }

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
            const menuItem = this.createMenuItem(itemType, scene, itemPosition);
            itemsMenu.items.push(menuItem);
        }

        itemsMenu.enable(false);
    }

    /**
     * Creates one item for the menu
     * @returns {ItemMenuItem} new Item
     * @todo puts the code out there
     */
    createMenuItem(itemType, scene, position) {
        const prefab = this.items[itemType].prefab;
        const amount = this.items[itemType].amount;

        const name = itemType + 'MenuItem';
        const setting = {
            group: 'hud',
            texture: prefab.itemTexture,
            itemName: itemType,
            amount: amount
        };

        const menuItem = new ItemMenuItem(scene, name, position, setting);
        menuItem.setOrigin(0);

        return menuItem;
    }

    /**
     * Collects a new item from a scene
     */
    collect(scene, item, key) {
        this.updateQuantity(item, 1, scene);

        if (! key) {
            const itemDatabaseRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/items')
                                                        .push(item);
            key = itemDatabaseRef.key;
        }

        this.items[item.type].keys.push(key);
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
                amount: 1,
                keys: []
            };
        }
    }
    //#endregion
}

export default Inventory;