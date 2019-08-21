import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Unit from './unit';
import PhysicalAttack from './physical-attack';
import EnemyUnit from './enemy-unit';

/**
 * Boss unit (during a battle)
 */
class BossUnit extends EnemyUnit {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods  
    
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        console.log('Bossss ');
    }
    //#endregion

    //#region internal methods
    
    //#endregion
}

export default BossUnit;