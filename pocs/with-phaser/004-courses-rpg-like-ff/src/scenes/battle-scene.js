import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import Unit from '../prefabs/battle/unit';

/**
 * Scene displaying title and starts game after clicked on it
 */
class BattleScene extends JSonLevelScene {
    constructor() {
        super('BattleScene');
    }

    //#region public methods
    create() {
        super.create();
    }
    //#endregion
    
    //#region internal methods
    setPrefabs() {
        console.log('BattleScene', 'setPrefabs');
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            playerUnit: Unit.prototype.constructor,
            enemyUnit: Unit.prototype.constructor,
        };
    }
    //#endregion
}

export default BattleScene;