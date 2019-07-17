import 'phaser';
import Player from '../sprites/player';
import Portal from '../sprites/portal';

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        console.log('constructor');
    }
    
    init(data) {
        this.data = data;
        this.loadingLevel = false;
    }
    
    create() {
        this.scale.on('resize', this.resize, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.createMap();
        this.createPlayer();
        
        this.createPortal();
        
        this.addCollisions();
        
        this.cameras.main.startFollow(this.player);
        
    }
    
    update() {
        this.player.update(this.cursors);
    }
    
    createPortal() {
        this.map.findObject('Portal', (obj) => {
            if(this.data.level === 1) {
                this.portal = new Portal(this, obj.x, obj.y - 68);
            } else if (this.data.level == 2) {
                this.portal = new Portal(this, obj.x, obj.y);
            }
        });
    }
    
    addCollisions() {
        this.physics.add.collider(this.player, this.blockedLayer);
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
    }
    
    createPlayer() {
        this.map.findObject('Player', (obj) => {
            if(this.data.newGame && this.data.level ===1) {
                if (obj.type === 'StartingPositionPortal') {
                    this.player = new Player(this, obj.x, obj.y);
                }
            }
            else {
                this.player = new Player(this, obj.x, obj.y);
            }
        });
    }
    
    createMap() {
        this.add.tileSprite(0, 0, 8000, 8000, 'RPGpack_sheet', 31);
        
        console.log(this.data.level);
        
        // create the tilemap
        this.map = this.make.tilemap({ key: 'level' + this.data.level });
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
        
        if (width === undefined) {
            width = this.sys.game.config.width;
        }
        if (height === undefined) {
            height = this.sys.game.config.height;
        }
        
        this.cameras.resize(width, height);
    }
    
    loadNextLevel() {
        if (! this.loadingLevel) {
            this.cameras.main.fade(500, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {
              if (this.data.level === 1) {
                this.scene.restart({ level: 2, newGame: false });
              } else if (this.data.level === 2) {
                this.scene.restart({ level: 1, newGame: false });
              }
            });
            this.loadingLevel = true;
          }
    }
}