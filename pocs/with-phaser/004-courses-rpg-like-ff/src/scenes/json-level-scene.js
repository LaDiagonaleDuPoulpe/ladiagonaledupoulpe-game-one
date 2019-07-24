import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

/**
 * Parent class to all scenev: anable you to load data from json file
 */
class JSonLevelScene extends Phaser.Scene {   

    constructor(key) {
        super({ key: key });
        this.setPrefabs();        
    }

    init(data) {
        this.levelData = data.levelData;
    }

    create() {
        this.prefabs = {};
        this.groups = {};

        this.levelData.groups.forEach(name => {
            this.groups[name] = this.add.group();
        }, this);

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
}

export default JSonLevelScene;