import Prefab from '../Prefab';
import MenuItem from './MenuItem';

class RunMenuItem extends MenuItem {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.run_chance = properties.run_chance;
    }
    
    select () {
        let random_number = this.scene.rnd.frac();    
        console.log(random_number)
        if (random_number < this.run_chance) {
            this.scene.back_to_world();
        } else {
            this.scene.next_turn();
        }
    }
}

export default RunMenuItem;
