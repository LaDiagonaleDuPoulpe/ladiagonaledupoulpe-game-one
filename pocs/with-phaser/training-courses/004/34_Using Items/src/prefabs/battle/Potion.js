import Prefab from '../Prefab';
import Item from './Item';

class Potion extends Item {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.health_power = properties.health_power;
    }
    
    use (target) {
        console.log('using potion');
        target.stats.health = Math.min(100, target.stats.health + this.health_power);
        console.log(target.name + ' healed to ' + target.stats.health);
    }
}

export default Potion;