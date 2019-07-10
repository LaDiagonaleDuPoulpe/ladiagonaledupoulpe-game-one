import 'phaser';
import config from './config';
import GameScene from './scenes/game';
import BootScene from './scenes/boot';

class Game extends Phaser.Game {
    constructor(configuration) {
        super(configuration);
        
        this.scene.add('Boot', BootScene);
        this.scene.add('Game', GameScene);

        this.scene.start('Boot');
        console.log('start');
    }
}

console.log('wtf');
window.game = new Game(config);

window.addEventListener('resize', (event) => {
    window.game.resize(window.innerWidth, window.innerHeight);
});