import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

class JSonLevelScene extends Phaser.Scene {   

    constructor(key) {
        super({ key: key });

        
    }

    init(data) {
        this.levelData = data.levelData;
    }

    create() {
        this.sprites = {};
        this.groups = {};

        this.levelData.groups.forEach(name => {
            this.groups[name] = this.add.group();
        }, this);

        for (const key in this.levelData.sprites) {
            let spriteData = this.levelData.sprites[key];
            let sprite = new this.prefabs[spriteData.type](this, key, spriteData.position, spriteData.properties);
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