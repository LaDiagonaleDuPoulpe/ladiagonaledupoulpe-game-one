import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
  }

  create () {
    // create our tilemap
    this.createMap();
  }

  createMap () {
    // create the tilemap
    this.map = this.make.tilemap({ key: 'level1' });
    // add tileset image
    this.tiles = this.map.addTilesetImage('RPGpack_sheet');
    // create our layers
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
  }
};
