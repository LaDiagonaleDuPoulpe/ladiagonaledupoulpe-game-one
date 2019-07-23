

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
                    sprite = this.add.sprite(spriteData.position.x, spriteData.position.y, spriteData.texture);
                } break;

                case 'text': {
                    sprite = this.add.text(spriteData.position.x, spriteData.position.y, spriteData.text, spriteData.style);
                } break;
            
                default:
                    break;
            }
            this.sprites[key] = sprite;
            this.groups[spriteData.group].add(sprite);
        }
    }
}

export default JSonLevelScene;