class LoadingScene extends Phaser.Scene {
    
    
    constructor() {
        super({ key: 'LoadingScene' });
    }
    
    //#region public methods
    init(data) {
        this.levelData = data.levelData;
        
        let message = this.add.text(320, 240, "Loading", { font: "48px Kells", fill: "#ffffff" });
    }
    
    preload() {
        let assets = this.levelData.assets;
        
        this.loadAssetsByType(assets);
        this.loadUserInputData();
    }
    
    create(data) {
        this.scene.start(data.scene, {
            levelData: this.levelData
        });
    }
    //#endregion

    //#region internal methods
    /**
     * Loads image, spritesheets or tilemap from json data
     * @param {*} assets 
     */
    loadAssetsByType(assets) {
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

                case "tilemap": {
                    this.load.tilemapTiledJSON(key, asset.source);
                } break;
                
                default:
                break;
            }
        }
    }

    /**
     * Loads user input json file
     */
    loadUserInputData() {
        for (const key in this.levelData.userInput) {
            if (this.levelData.userInput.hasOwnProperty(key)) {
                const path = this.levelData.userInput[key];
                
                this.load.json(key, path);
            }
        }
    }
    //#endregion
}

export default LoadingScene;