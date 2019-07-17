import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
    console.log('BootScene constructor');
  }

  preload () {
    

    // load in the tilemap
    this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON('level2', 'assets/tilemaps/level2.json');
    // load in the spritesheet
    this.load.spritesheet('RPGpack_sheet', 'assets/images/RPGpack_sheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('characters', 'assets/images/roguelikeChar_transparent.png', { frameWidth: 17, frameHeight: 17 });
    this.load.image('portal', 'assets/images/raft.png');
  }

  create () {
    this.scene.start('Game', { level: 1, newGame: true, levels: [] });
  }
};