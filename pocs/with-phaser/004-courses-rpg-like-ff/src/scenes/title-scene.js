import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import firebase from 'firebase/app';
import auth from 'firebase/auth';

/**
 * Scene displaying title and starts game after clicked on it
 */
class TitleScene extends JSonLevelScene {
    constructor() {
        super('TitleScene');
    }

    //#region public methods
    login() {
        let readyToStartGame = true;

        if (! firebase.auth().currentUser) {
            readyToStartGame = false;
            this.launchLoginInformationsPopup();
        }

        if (readyToStartGame) {
            this.startGame();
        }
    }

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

    handleError(error) {
        console.error('try to log', error);
    }
    //#endregion
    
    //#region internal methods
    launchLoginInformationsPopup() {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().signInWithPopup(provider).then(this.startGame.bind(this))
                                                 .catch(this.handleError.bind(this));
    }

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