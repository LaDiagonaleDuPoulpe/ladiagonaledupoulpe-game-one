import TextPrefab from '../TextPrefab';

class ShowStatWithBar extends TextPrefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.unit_data = this.scene.prefabs[properties.prefab];
        this.stat = properties.stat;
        this.bar_sprite = this.scene.add.sprite(this.x, this.y + 20, properties.bar_texture);
        this.bar_sprite.setOrigin(0);
    }
    
    update () {
        this.current_stat = this.unit_data.stats[this.stat];
        this.bar_sprite.setScale(this.current_stat / 100, 1.0);
    }
    
    show (show) {
        this.setVisible(show);
        this.bar_sprite.setVisible(show);
    }
}

export default ShowStatWithBar;
