import JSonLevelScene from './json-level-scene';

class TitleScene extends JSonLevelScene {
    constructor() {
        super('TitleScene');
    }

    setPrefabs() {
        this.prefabs = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        };
    }
}

export default TitleScene;