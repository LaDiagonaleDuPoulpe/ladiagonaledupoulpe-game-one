import Prefab from '../Prefab';

class Door extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.next_level = properties.next_level;
        
        this.body.immovable = true;
        
        this.scene.physics.add.collider(this, this.scene.groups.players, this.enter, null, this);
    }
    
    enter() {
        this.scene.scene.start('BootScene', {scene: this.next_level});
    }
}

export default Door;