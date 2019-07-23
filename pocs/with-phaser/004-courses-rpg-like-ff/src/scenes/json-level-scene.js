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

            let sprite = null;
            switch (spriteData.type) {
                case 'sprite': {
                    sprite = new Prefab(this, key, spriteData.position, spriteData.properties);
                } break;

                case 'text': {
                    sprite = new TextPrefab(this, key, spriteData.position, spriteData.properties);
                } break;
            
                default:
                    break;
            }
        }
    }
}

export default JSonLevelScene;