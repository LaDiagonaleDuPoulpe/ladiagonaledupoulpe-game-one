import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Item from './item';

/**
 * Represents an potion item
 */
class Potion extends Item {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods 
    use(target) {
        console.log('using item::before', target.stats.health);
        target.stats.health = Math.min(100, target.stats.health + this.healthPower);
        console.log('using item::after', target.stats.health);
    } 
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.healthPower = properties.healthPower;
    }
    //#endregion

    //#region internal methods
    //#endregion
}

export default Potion;