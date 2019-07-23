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
}

export default TitleScene;