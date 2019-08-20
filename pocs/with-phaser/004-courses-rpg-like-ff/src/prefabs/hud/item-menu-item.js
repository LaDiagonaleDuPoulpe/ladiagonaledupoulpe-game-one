import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import PhysicalAttack from '../battle/physical-attack';

/**
 * It represents a specific menu item, when you want to select one item
 */
class ItemMenuItem extends MenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods   
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.itemName = properties.itemName;
        this.amount = properties.amount;
    }

    /**
     * Selects one menu
     */
    select() {
        this.useItem();
    }
    //#endregion

    //#region internal methods   
    useItem() {
        if (this.scene.cache.game.inventory.hasItem(this.itemName)) {
            this.scene.prefabs.itemsMenu.enable(false);
            this.scene.cache.game.inventory.useItem(this.itemName, this.scene.currentUnit);

            const sceneBeforeDestroyItem = this.scene;
            if (this.scene.cache.game.inventory.hasItem(this.itemName)) {
                this.destroy();
            }
            sceneBeforeDestroyItem.goToNextTurn();
        }
    }
    //#endregion
}

export default ItemMenuItem;