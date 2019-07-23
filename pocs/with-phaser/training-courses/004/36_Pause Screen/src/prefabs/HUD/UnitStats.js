import Prefab from '../Prefab';

class UnitStats extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);

        this.stats = Object.create(properties.stats);
        
        this.face_texture = properties.face_texture;
    }
    
    change_current_unit (new_prefab, new_face_texture) {
        this.unit_data = new_prefab;
        this.player_unit_health.unit_data = this.unit_data;
        this.player_unit_mana.unit_data = this.unit_data;
        this.face_sprite.setTexture(new_face_texture);
    }
    
    show (show) {
        this.player_unit_health.show(show);
        this.player_unit_mana.show(show);
        this.face_sprite.setVisible(show);
    }
}

export default UnitStats;