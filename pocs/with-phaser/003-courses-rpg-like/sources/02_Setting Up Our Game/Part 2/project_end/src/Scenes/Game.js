import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    this.logo = this.add.image(400, 150, 'logo');
  }
};
