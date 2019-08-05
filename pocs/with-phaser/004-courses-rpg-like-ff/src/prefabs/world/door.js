import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Door extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods
    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.nextLevel = properties.nextLevel;
        this.scene.physics.add.collider(this, this.scene.groups.players,
            this.enter, null, this);
            
        this.body.immovable = true;
    }
        
        
    /**
    * Actions when user enters in the cave
    * (callback when collision with Door)
    */
    enter() {
        this.scene.scene.start('BootScene', {
            scene: this.nextLevel
        });
    }
    //#endregion
}

export default Door;