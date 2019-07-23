import Prefab from '../Prefab';

class EnemySpawner extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.encounter = this.scene.cache.json.get(properties.encounter);
        
        this.body.immovable = true;
        
        this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
    }
    
    spawn() {
        this.scene.scene.start('BootScene', {scene: 'battle', extra_parameters: {previous_level: this.scene.level_data.level, encounter: this.encounter}});
    }
}

export default EnemySpawner;