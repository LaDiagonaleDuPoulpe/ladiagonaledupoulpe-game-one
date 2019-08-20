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
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        
    }
    //#endregion

    //#region internal methods
    //#endregion
}

export default Item;