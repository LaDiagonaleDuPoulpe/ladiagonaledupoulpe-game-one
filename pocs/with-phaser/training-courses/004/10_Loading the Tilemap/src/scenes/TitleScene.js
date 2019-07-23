import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab.js';
import TextPrefab from '../prefabs/TextPrefab.js';

class TitleScene extends JSONLevelScene {
    constructor() {
        super('TitleScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        }
    }
    
    update() {
        if (this.input.activePointer.isDown) {
            this.start_game();
        }
    }
    
    start_game() {
        console.log("starting next state");
    }
}

export default TitleScene;