import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });
  }

  init () {
    this.coinsCollected = 0;
  }

  create () {
    // create score text
    this.scoreText = this.add.text(12, 12, `Score: ${this.coinsCollected}`, { fontSize: '32px', fill: '#fff' });

    // get a reference to the game scene
    this.gameScene = this.scene.get('Game');

    // listen for events from that scene
    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
    });
  }
}