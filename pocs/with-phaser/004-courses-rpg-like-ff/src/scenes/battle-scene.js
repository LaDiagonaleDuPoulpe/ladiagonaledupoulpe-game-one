import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

/**
 * Scene displaying title and starts game after clicked on it
 */
class BattleScene extends JSonLevelScene {
    constructor() {
        super('BattleScene');
    }

    //#region public methods
    //#endregion
    
    //#region internal methods
    setPrefabs() {
        console.log('BattleScene', 'setPrefabs');
        this.prefabsClasses = {
        };
    }
    //#endregion
}

export default BattleScene;