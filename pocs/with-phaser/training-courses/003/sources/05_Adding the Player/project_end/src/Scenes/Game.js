import 'phaser';
import Player from '../Sprites/Player';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
  }

  create () {
    // listen for the resize event
    this.scale.on('resize', this.resize, this);
    // listen for player input
    this.cursors = this.input.keyboard.createCursorKeys();

    // create our tilemap
    this.createMap();
    // create our player
    this.createPlayer();

    // add collisions
    this.addCollisions();

    // update our camera
    this.cameras.main.startFollow(this.player);
  }

  update () {
    this.player.update(this.cursors);
  }

  addCollisions () {
    this.physics.add.collider(this.player, this.blockedLayer);
  }

  createPlayer () {
    this.map.findObject('Player', (obj) => {
      if (obj.type === 'StartingPosition') {
        this.player = new Player(this, obj.x, obj.y);
      }
    });
  }

  resize (gameSize, baseSize, displaySize, resolution) {
   let width = gameSize.width;
   let height = gameSize.height;
   if (width === undefined) {
     width = this.sys.game.config.width;
   }
   if (height === undefined) {
     height = this.sys.game.config.height;
   }
   this.cameras.resize(width, height);
 }

  createMap () {
    // create the tilemap
    this.map = this.make.tilemap({ key: 'level1' });
    // add tileset image
    this.tiles = this.map.addTilesetImage('RPGpack_sheet');
    // create our layers
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);
  }
};
