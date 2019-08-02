import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import UserInput from '../plugins/user-input';

/**
* Parent class to all scenev: anable you to load data from json file
*/
class JSonLevelScene extends Phaser.Scene {   
    
    constructor(key) {
        super({ key: key });
        this.setPrefabs();        
    }
    
    //#region public methods
    init(data) {
        this.levelData = data.levelData;
    }
    
    create() {
        this.prefabs = {};
        this.groups = {};
        
        this.createGroups();
        this.initAllPrefabs();
        this.initUserInputPlugin();
    }
    
    update() {
        this.updateAllPrefabs();
    }
    //#endregion
    
    //#region internal methods
    /**
     * Inits new UserInput class
     */
    initUserInputPlugin() {
        this.userInput = new UserInput(this);
        this.userInputData = this.cache.json.get(this.levelData.userInput.key);
        this.userInput.setInput(this.userInputData);
    }

    /**
     * Updates all child prefabs
     */
    updateAllPrefabs() {
        for (const name in this.prefabs) {
            if (this.prefabs.hasOwnProperty(name)) {
                this.prefabs[name].update();
            }
        }
    }
    
    /**
     * Creates physic group (to manage collision for example)
     */
    createGroups() {
        this.levelData.groups.forEach(name => {
            this.groups[name] = this.physics.add.group();
        }, this);
    }
    
    /**
     * Create all prefab items
     */
    initAllPrefabs() {
        for (const key in this.levelData.prefabs) {
            let spriteData = this.levelData.prefabs[key];
            let prefab = new this.prefabsClasses[spriteData.type](this, key, spriteData.position, spriteData.properties);
        }
    }
    
    /**
    * Define prefabs list 
    * You must with constructors
    * Todo: doing better : just pass class type, and the parent class will set all constructors in the array list
    */
    setPrefabs() {
        throw new Error('You must override it in child class');
    }
    //#endregion
}

export default JSonLevelScene;