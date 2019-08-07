import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import TextPrefab from '../text-prefab';

class MessageBox extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    /**
     * Hides and destroy the message box
     */
    destroy() {
        super.destroy();
        this.messageText.destroy();
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        const newPosition = {
            x: this.x + (this.width / 2),
            y: this.y + 50
        };

        const newProperties = {
            group: 'hud',
            text: properties.message, 
            style: Object.create(this.scene.TEXT_STYLE)
        };

        this.messageText = new TextPrefab(this.scene, this.name + 'Message', newPosition, newProperties);
   
        this.setOrigin(0);
        this.messageText.setOrigin(0.5);
    }     
    //#endregion
}

export default MessageBox;