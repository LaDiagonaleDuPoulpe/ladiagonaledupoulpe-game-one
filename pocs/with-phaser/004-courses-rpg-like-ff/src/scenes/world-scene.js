import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

/**
 * Loading worl tilemap scene
 */
class WorldScene extends JSonLevelScene {
    constructor() {
        super('WorldScene');
    }

    //#region public methods
    update() {
        if (this.input.activePointer.isDown) {
            this.startGame();
        }
    }
    //#endregion
    
    //#region internal methods
    startGame() {
        console.log('starting');
    }

    setPrefabs() {
        console.log('setPrefabs');
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        };
    }
    //#endregion
}

export default WorldScene;