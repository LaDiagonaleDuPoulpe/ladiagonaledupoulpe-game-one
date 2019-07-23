import TitleScene from './scenes/TitleScene';
import BootScene from './scenes/BootScene';

let titleScene = new TitleScene();
let bootScene = new BootScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('BootScene', bootScene);
game.scene.start('BootScene', {scene: 'title'});