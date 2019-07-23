import 'phaser';
import TitleScene from './scenes/TitleScene';

let titleScene = new TitleScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scaleMode: Phaser.ScaleModes.DEFAULT
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start("TitleScene");
