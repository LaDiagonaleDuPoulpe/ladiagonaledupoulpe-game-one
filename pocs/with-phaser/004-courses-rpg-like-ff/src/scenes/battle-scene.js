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
            background: Prefab.prototype.constructor,
            playerUnit: Prefab.prototype.constructor,
            enemyUnit: Prefab.prototype.constructor,
        };
    }
    //#endregion
}

export default BattleScene;