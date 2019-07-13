import 'phaser';
import Player from '../sprites/player';

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        console.log('constructor');
    }
    
    preload() {
    }
    
    create() {
        this.scale.on('resize', this.resize, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.createMap();
        this.createPlayer();

        this.addCollisions();
    }
    
    update() {
        this.player.update(this.cursors);
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.blockedLayer);
    }
    
    createPlayer() {
        console.log('create ?');
        this.map.findObject('Player', (obj) => {
            console.log('create ?!!!!');
            if (obj.type === 'StartingPosition') {
                this.player = new Player(this, obj.x, obj.y);
                this.cameras.main.startFollow(this.player);
            }
        });
    }
    
    createMap() {
        // create the tilemap
        this.map = this.make.tilemap({ key: 'level1' });
        // add tileset image
        this.tiles = this.map.addTilesetImage('RPGpack_sheet');
        // create our layers
        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
        
        this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
        this.blockedLayer.setCollisionByExclusion([-1]);
    }
    
    resize(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;
        
        this.cameras.resize(width, height);
    }
}