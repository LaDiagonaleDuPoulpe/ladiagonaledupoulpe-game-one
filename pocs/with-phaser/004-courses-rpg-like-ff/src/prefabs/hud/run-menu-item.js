import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';
import PhysicalAttack from '../battle/physical-attack';

/**
 * It represents a specific menu item, when you want to leave the fight
 */
class RunMenuItem extends MenuItem {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods   
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.runChance = properties.runChance;
    }

    /**
     * Selects one menu
     */
    select() {
        const currentChance = this.scene.random.frac();

        if (currentChance < this.runChance) {
            this.scene.backToWorld();
        } else {
            this.scene.goToNextTurn();
        }
    }
    //#endregion
}

export default RunMenuItem;