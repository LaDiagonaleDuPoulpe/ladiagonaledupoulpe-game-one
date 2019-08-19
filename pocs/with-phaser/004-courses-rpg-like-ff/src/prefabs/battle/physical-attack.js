import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Attack from './attack';

/**
* Enemy unit (during a battle)
*/
class PhysicalAttack extends Attack {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
}

export default PhysicalAttack;