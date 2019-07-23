class LoadingScene extends Phaser.Scene {
    
    
    constructor() {
        super({ key: 'LoadingScene' });
    }
    
    init(data) {
        this.levelData = data.levelData;
        
        let message = this.add.text(320, 240, "Loading", { font: "48px Kells", fill: "#ffffff" });
    }
    
    preload() {
        let assets = this.levelData.assets;
        
        for (const key in assets) {
            let asset = assets[key];
            
            switch (asset.type) {
                case 'image':
                    this.load.image(key, asset.source);
                break;
                
                case 'spritesheet': {
                    this.load.spritesheet(key, asset.source, { 
                        frameWidth: asset.frameWidth,
                        frameHeight: asset.frameHeight,
                        frames: asset.frames,
                        margin: asset.margin,
                        spacing: asset.spacing
                    });
                } break;
                
                default:
                break;
            }
        }
    }
    
    create() {
        this.scene.start('TitleScene', {
            levelData: this.levelData
        });
    }
}

export default LoadingScene;