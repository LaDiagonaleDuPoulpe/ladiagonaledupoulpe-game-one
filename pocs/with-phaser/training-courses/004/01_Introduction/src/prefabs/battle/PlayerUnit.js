import Prefab from '../Prefab';
import Unit from './Unit';

class PlayerUnit extends Unit {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.face_texture = properties.face_texture;
    }
    
    act () {
        this.scene.prefabs.show_player_unit.show(true);
        this.scene.prefabs.show_player_unit.change_current_unit(this, this.face_texture);
        
        this.scene.prefabs.actions_menu.enable(true);
    }
    
    receive_experience (experience) {
        this.experience += experience;
        
        console.log(experience);
        
        let next_level_data = this.scene.experience_table[this.current_level];
        
        if (this.experience >= next_level_data.required_exp) {
            this.current_level += 1;
            this.experience = 0;
            for (let stat in next_level_data.stats_increase) {
                this.stats[stat] += next_level_data.stats_increase[stat];
            }
        }
    }
}

export default PlayerUnit;