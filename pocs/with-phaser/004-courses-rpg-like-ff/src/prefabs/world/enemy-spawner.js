import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class EnemySpawner extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.scene.physics.add.collider(this, this.scene.groups.players, this.spawn, null, this);
            
        this.body.immovable = true;
    }        
        
    /**
    * Action the enemy starts the battle
    */
    spawn() {
        console.log('I spawn');
    }
    //#endregion
}

export default EnemySpawner;