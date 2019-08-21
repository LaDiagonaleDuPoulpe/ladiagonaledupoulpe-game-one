import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

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
            this.loadDataFromDatabase(firebase.auth().currentUser.uid);
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
    /**
     * Callback after login to load data
     * @param {Auth} result 
     */
    loadDataFromDatabaseAfterLogin(result) {
        this.loadDataFromDatabase(result.user.uid);
    }

    /**
     * Calls database to load data
     */
    loadDataFromDatabase(userId) {
        firebase.database().ref('/users/' + userId).once('value').then(this.retrieveDataOfGame.bind(this))
    }

    /**
     * Callback for retrieving data
     * @param {Snapshot} snapshot 
     */
    retrieveDataOfGame(snapshot) {
        const userData = snapshot.val();

        if (! userData) {
            this.cache.game.partyData = this.defaultData.partyData;
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/partyData')
                               .set(this.cache.game.partyData)
                               .then(this.startGame.bind(this));
        } else {
            this.cache.game.partyData = userData.partyData || this.defaultData.partyData;
            this.loadItems(userData);
            this.startGame();
        }
    }

    loadItems(userData) {
        const items = userData.items || this.defaultData.items;

        for (let itemKey in items) {
            this.cache.game.inventory.collect(this, items[itemKey], itemKey);
        }
    }

    /**
     * Creates and open a popup to login with google
     */
    launchLoginInformationsPopup() {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        firebase.auth().signInWithPopup(provider).then(this.loadDataFromDatabaseAfterLogin.bind(this))
                                                 .catch(this.handleError.bind(this));
    }

    /**
     * Loads default data of the party
     */
    loadDefaultDataParty() {
        this.load.json('default_data', 'assets/levels/default_data.json');
    }

    /**
     * Gets default data from cache
     */
    getDefaultDataParty() {
        this.defaultData = this.cache.json.get('default_data');
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