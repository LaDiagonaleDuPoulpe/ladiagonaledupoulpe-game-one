import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
 * Represents an item (potion, ...)
 */
class Item extends Prefab {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods
    /**
     * Uses the item, applied to unit
     * @param {Unit} target 
     */ 
    use(target) {
        console.log('using item');
    } 
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.itemTexture = properties.itemTexture;
    }
    //#endregion

    //#region internal methods
    //#endregion
}

export default Item;