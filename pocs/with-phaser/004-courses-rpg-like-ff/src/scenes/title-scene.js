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
    /**
     * Starts the game
     */
    startGame() {
        this.scene.start('BootScene', {
                                       scene: 'town' 
                                      });
    }

    create() {
        super.create();

        this.saveParty();    
    }
    //#endregion
    
    //#region internal methods
    /**
     * Saves the party in cache
     */
    saveParty() {
        this.cache.game.partyData = {

        };
    }

    setPrefabs() {
        this.prefabsClasses = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        };
    }
    //#endregion
}

export default TitleScene;