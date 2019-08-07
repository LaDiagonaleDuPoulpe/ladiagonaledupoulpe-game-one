import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MessageBox from '../hud/message-box';

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
        
        this.MESSAGE_BOX_POSITION = {
            x: 0,
            y: 360
        };

        this.scene.physics.add.collider(this, this.scene.groups.players, this.talk, null, this);
        
        this.body.immovable = true;

    }        
    //#endregion
    
    //#region internal methods
    /**
    * Actions when people will talk
    * (displaying npc message)
    */
    talk(npc, player) {
        player.stop();
        
        const properties = {
            texture: 'messageBoxImage',
            group: 'hud',
            message: this.message
        };
        this.scene.currentMessageBox = new MessageBox(this.scene, this.name + 'MessageBox', this.MESSAGE_BOX_POSITION, properties);
    }


    //#endregion
}

export default NPC;