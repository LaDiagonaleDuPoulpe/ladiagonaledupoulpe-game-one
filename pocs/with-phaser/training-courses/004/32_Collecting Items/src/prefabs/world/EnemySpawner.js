import Prefab from '../Prefab';

class EnemySpawner extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.scene.physics.add.existing(this);
        this.body.immovable = true;
        
        this.encounter = this.scene.cache.json.get(properties.encounter);
    }
    
    update () {
        if (this.scene) {
            this.overlapping = this.scene.physics.world.collide(this, this.scene.groups.players, this.spawn, null, this);
        }
    }
    
    spawn () {
        this.scene.scene.start('BootScene', {scene: 'battle', extra_parameters: {previous_level: this.scene.level_data.level, encounter: this.encounter}});
    }
}

export default EnemySpawner;
