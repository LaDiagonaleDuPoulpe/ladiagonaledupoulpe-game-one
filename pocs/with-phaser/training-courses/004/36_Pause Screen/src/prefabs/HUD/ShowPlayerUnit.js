import Prefab from '../Prefab';
import ShowStatWithBar from './ShowStatWithBar';

class ShowPlayerUnit extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.face_texture = properties.face_texture;
        
        this.unit_data = this.scene.prefabs[properties.prefab];
    
        this.player_unit_health = new ShowStatWithBar(this.scene, this.name + "_health", {x: this.x, y: this.y}, 
        {group: "hud", anchor: {x: 0, y: 0}, text: "HP", style: properties.text_style, prefab: properties.prefab, stat: "health", bar_texture: "healthbar_image"});

        this.player_unit_mana = new ShowStatWithBar(this.scene, this.name + "_mana", {x: this.x, y: this.y + 30}, 
        {group: "hud", anchor: {x: 0, y: 0}, text: "MP", style: properties.text_style, prefab: properties.prefab, stat: "mana", bar_texture: "manabar_image"});

        this.face_sprite = this.scene.add.sprite(this.x + 130, this.y, properties.face_texture);
        this.face_sprite.setOrigin(0);
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

export default ShowPlayerUnit;
