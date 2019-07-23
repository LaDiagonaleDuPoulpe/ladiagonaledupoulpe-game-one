import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

class TitleScene extends JSonLevelScene {
    constructor() {
        super('TitleScene');
    }

    setPrefabs() {
        console.log('setPrefabs');
        this.prefabs = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        };
    }
}

export default TitleScene;