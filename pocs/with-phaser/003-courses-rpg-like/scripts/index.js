import 'phaser';
import config from './config';
import GameScene from './scenes/game';
import BootScene from './scenes/boot';
import UIScene from './Scenes/ui';

class Game extends Phaser.Game {
    constructor(configuration) {
        super(configuration);
        
        this.scene.add('Boot', BootScene);
        this.scene.add('Game', GameScene);
        this.scene.add('UI', UIScene);
        
        this.scene.start('Boot');
        console.log('start');
    }
}

console.log('wtf');
window.game = new Game(config);

window.addEventListener('resize', (event) => {
    console.log(window.innerWidth);
    if(window.game) {
        window.game.scale.resize(window.innerWidth, window.innerHeight);
    }
});