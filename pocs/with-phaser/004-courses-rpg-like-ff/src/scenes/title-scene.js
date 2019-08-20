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

    preload() {
        this.loadDefaultDataParty();
    }

    create() {
        super.create();   
        this.getDefaultDataParty();
    }
    //#endregion
    
    //#region internal methods
    /**
     * Loads default data of the party
     */
    loadDefaultDataParty() {
        this.load.json('default_data', 'assets/levels/default_data.json');
    }

    getDefaultDataParty() {
        this.cache.game.partyData = this.cache.json.get('default_data');
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