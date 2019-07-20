import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });
  }

  init () {
    this.coinsCollected = 0;
    this.health = 3;
  }

  create () {
    // create score text
    this.scoreText = this.add.text(12, 12, `Score: ${this.coinsCollected}`, { fontSize: '32px', fill: '#fff' });
    this.healthText = this.add.text(12, 40, `Vies: ${this.health}`, { fontSize: '32px', fill: '#fff' });

    // get a reference to the game scene
    this.gameScene = this.scene.get('Game');

    // listen for events from that scene
    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
    });

    this.gameScene.events.on('loseHealth', (health) => {
      this.health = health;
      this.healthText.setText(`Vies: ${this.health}`);
    });
    
    this.gameScene.events.on('newGame', () => {
      this.coinsCollected = 0;
      this.health = 3;
      
      this.healthText.setText(`Vies: ${this.health}`);
      this.scoreText.setText(`Score: ${this.coinsCollected}`);
    });
  }
}