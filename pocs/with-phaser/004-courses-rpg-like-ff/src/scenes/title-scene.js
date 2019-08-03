import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

/**
 * Scene displaying title and starts game after clicked on it
 */
class TitleScene extends JSonLevelScene {
    constructor() {
        super('TitleScene');
    }

    //#region public methods
    //#endregion
    
    //#region internal methods
    startGame() {
        console.log('starting');
        this.scene.start('BootScene', {
                                       scene: 'town' 
                                      });
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

export default TitleScene;