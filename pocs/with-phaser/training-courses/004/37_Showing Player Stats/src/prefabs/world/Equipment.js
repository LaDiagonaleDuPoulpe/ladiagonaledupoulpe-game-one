import Prefab from '../Prefab';

class Equipment extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.setScale(0.3, 0.3);
        
        this.unit_name = properties.unit_name;
        this.body_part = properties.body_part;
        this.stat = properties.stat;
        this.bonus = +properties.bonus;
        
        this.scene.physics.add.existing(this);
        this.body.immovable = true;
        this.body.setSize(this.width * this.scaleX, this.height * this.scaleY);
    }
    
    update () {
        if (this.scene) {
            this.scene.physics.world.collide(this, this.scene.groups.players, this.collect, null, this);
        }
    }
    
    collect () {
        let unit_data = this.scene.cache.game.party_data[this.unit_name];
    
        if (unit_data.equipment[this.body_part].name !== this.name) {
            unit_data.equipment[this.body_part] = {name: this.name};
            unit_data.stats_bonus[this.stat] = this.bonus;
            this.destroy();
        }
    }
}

export default Equipment;
