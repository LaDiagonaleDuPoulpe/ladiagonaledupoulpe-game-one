import 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        console.log('constructor');
    }

    preload() {
    }

    create() {
        console.log('create');
        this.createMap();
    }
    
    createMap() {
        this.map = this.make.tilemap({ key: 'level1' });
        this.tiles = this.map.addTilesetImage('RPGpack_sheet');
        this.map.createStaticLayer('Background', this.tiles, 0, 0);
    }
}