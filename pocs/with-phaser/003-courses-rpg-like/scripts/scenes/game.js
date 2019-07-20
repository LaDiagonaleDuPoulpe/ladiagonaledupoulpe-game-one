import 'phaser';
import Player from '../sprites/player';
import Portal from '../sprites/portal';
import Coins from '../groups/coins';
import Enemies from '../groups/enemies';
import Bullets from '../groups/bullets';

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        console.log('constructor');
    }
    
    init(data) {
        this.data = data;
        this.loadingLevel = false;

        this.events.emit('newGame');
    }
    
    create() {
        this.scale.on('resize', this.resize, this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.createMap();

        this.createPlayer();
        
        this.createPortal();

        this.createCoins();

        this.createEnemies();

        this.createBullets();
        
        this.addCollisions();
        
        this.cameras.main.startFollow(this.player);
        
    }
    
    update() {
        this.player.update(this.cursors);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction);
        }
    }

    createBullets() {
        this.bullets = new Bullets(this.physics.world, this, []);
    }

    createEnemies() {
        this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
    }
    
    createCoins() {
        this.coins = this.map.createFromObjects('Coins', 'Coin', { key: 'coin' })
        
        console.log('coins', this.coins);
        this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);
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
        this.physics.add.collider(this.enemiesGroup, this.blockedLayer);


        this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player));
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
        this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collect.bind(this.coinsGroup));     
        this.physics.add.overlap(this.bullets, this.enemiesGroup, this.bullets.collision);     
        
    }
    
    createPlayer() {
        this.map.findObject('Player', (obj) => {
            if(this.data.newGame && this.data.level ===1) {
                if (obj.type === 'StartingPosition') {
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