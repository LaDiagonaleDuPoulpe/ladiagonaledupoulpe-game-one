class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadingScene'
        });
    }
    
    init (data) {
        this.level_data = data.level_data;
    
        let loading_message = this.add.text(320, 240, "Loading", {font: "48px Kells", fill:    "#ffffff"});
    }
    
    preload () {
        let assets = this.level_data.assets;
        for (let asset_key in assets) {
            let asset = assets[asset_key];
            switch (asset.type) {
                case "image":
                    this.load.image(asset_key, asset.source);
                    break;
                case "spritesheet":
                    this.load.spritesheet(asset_key, asset.source, {frameWidth: asset.frame_width, frameHeight: asset.frame_height, frames: asset.frames, margin: asset.margin, spacing: asset.spacing});
                case "tilemap":
                    this.load.tilemapTiledJSON(asset_key, asset.source);
                    break;
            }
        }
    }
    
    create (data) {
        this.scene.start(data.scene, {level_data: this.level_data});
    }
}

export default LoadingScene;