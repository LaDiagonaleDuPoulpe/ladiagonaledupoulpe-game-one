import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Door extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
        this.nextLevel = properties.nextLevel;
        this.body.immovable = true;
        this.scene.physics.add.collider(this, this.scene.groups.players,
                                        this.enter, null, this);
    }
    
    //#region public methods
    
    //#endregion
    
    //#region protected methods
    // initialize(scene, name, position, properties) {
    // }

    /**
     * Actions when user enter in the cave
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