import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
 * Manages player meeting with enemy
 */
class EnemySpawner extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.encounter = this.scene.cache.json.get(properties.encounter);

        this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
            
        this.body.immovable = true;
    }        
        
    /**
    * Action the enemy starts the battle
    */
    spawn() {
        this.scene.scene.start('BootScene', {
            scene: 'battle',
            extraParameters: {
                previousLevel: this.scene.levelData.level,
                encounter: this.encounter
            }
        });
    }
    //#endregion
}

export default EnemySpawner;