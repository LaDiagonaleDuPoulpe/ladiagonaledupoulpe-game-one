import Prefab from '../Prefab';
import PhysicalAttack from './PhysicalAttack';
import EnemyUnit from './EnemyUnit';

class BossUnit extends EnemyUnit {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        console.log('creating boss');
    }
    
}

export default BossUnit;