import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class NPC extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.message = this.scene.cache.text.get(properties.message);

        this.scene.physics.add.collider(this, this.scene.groups.players,
            this.talk, null, this);
            
        this.body.immovable = true;
    }        
        
    /**
    * Actions when people will talk
    * (displaying npc message)
    */
    talk(npc, player) {
        player.stop();
        console.log('talk', this.message);
    }
    //#endregion
}

export default NPC;