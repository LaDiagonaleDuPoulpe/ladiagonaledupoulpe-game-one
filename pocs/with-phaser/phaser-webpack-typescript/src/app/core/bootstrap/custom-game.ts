import "phaser";
import { injectable } from 'tsyringe';
import { MainScene } from "../scenes/main-scene";

@injectable()
export class CustomGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);

        this.addScenes();
    }

    private init() {
        this.addScenes();
    }

    private addScenes() {
       this.scene.add('MainScene', new MainScene('MainScene'));
    }

    start() {
        super.start();
        this.scene.start('MainScene');
    }

    boot() {
        //this.logger.log('boot'); // not run : boot event here is calling before constructor and so on, before dependency injection        
        super.boot();
    }

    
}