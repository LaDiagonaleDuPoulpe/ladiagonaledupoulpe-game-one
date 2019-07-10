import 'phaser';
import config from './config';
import GameScene from './scenes/game';

class Game extends Phaser.Game {
    constructor(configuration) {
        super(configuration);
        this.scene.add('Game', GameScene);
        this.scene.start();
    }
}

window.game = new Game(config);