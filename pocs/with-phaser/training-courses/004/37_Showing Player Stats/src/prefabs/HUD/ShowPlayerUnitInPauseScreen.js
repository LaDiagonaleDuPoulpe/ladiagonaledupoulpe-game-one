import Prefab from '../Prefab';
import ShowPlayerUnit from './ShowPlayerUnit';
import ShowStatWithBar from './ShowStatWithBar';

class ShowPlayerUnitInPauseScreen extends ShowPlayerUnit {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        let prefab_data = this.scene.cache.game.party_data[properties.prefab];
    
        let attack = prefab_data.stats.attack;
        this.show_unit_attack = this.scene.add.text(this.x + 250, this.y, "Attack: \n" + attack, properties.text_style);
        this.show_unit_attack.setOrigin(0);

        let defense = prefab_data.stats.defense;
        this.show_unit_defense = this.scene.add.text(this.x + 250, this.y + 50, "Defense: \n" + defense, properties.text_style);
        this.show_unit_defense.setOrigin(0);

        let magic_attack = prefab_data.stats.magic_attack;
        this.show_unit_magic_attack = this.scene.add.text(this.x + 400, this.y, "Magic: \n" + magic_attack, properties.text_style);
        this.show_unit_magic_attack.setOrigin(0);

        let speed = prefab_data.stats.speed;
        this.show_unit_speed = this.scene.add.text(this.x + 400, this.y + 50, "Speed: \n" + speed, properties.text_style);
        this.show_unit_speed.setOrigin(0);

        let level = this.scene.cache.game.party_data[properties.prefab].current_level + 1;
        this.level_text = this.scene.add.text(this.x + 130, this.y + 100, "Level: " + level, properties.text_style);
        this.level_text.setOrigin(0);
    }
    
    show (show) {
        super.show(show);
        this.show_unit_attack.setVisible(show);
        this.show_unit_defense.setVisible(show);
        this.show_unit_magic_attack.setVisible(show);
        this.show_unit_speed.setVisible(show);
        this.level_text.setVisible(show);
    }
}

export default ShowPlayerUnitInPauseScreen;
