
const config = {
    type: Phaser.WEBGL,
    width: 1960,
    height: 1080,
    backgroundColor:  0x2d2d2d,
    parent: 'la-diagonale-du-poulpe',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let texture = undefined;
let player = null;

console.log('game.state :', game.state);

function preload() {
    cursors = this.input.keyboard.createCursorKeys();

    console.log('cursors :', cursors);
    player = new Player(cursors, this, 100, 200);
    player.preload();
}

var light1 = null;
var light2 = null;
let cursors = null;

var character = null;
function create() {
    //this.stage.backgroundColor = 0x4488cc;

    //this = this.physics.add.sprite(500, 500, 'character_sheet_all');
    player.create();

    //this.cameras.main.fadeIn(6000);

    light1 = this.lights.addLight(100, 300, 500).setColor(0xffffff).setIntensity(2);
    var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 700, 1000);

    light2 = this.lights.addLight(10, 600, 500).setColor(0xffffff).setIntensity(2);
    var ellipse2 = new Phaser.Geom.Ellipse(light2.x, light2.y, 700, 1200);


    this.time.addEvent({
        delay: 500,
        callback: function ()
        {
            Phaser.Geom.Ellipse.Random(ellipse1, light1);
        },
        callbackScope: this,
        repeat: -1
    });

    this.time.addEvent({
        delay: 80,
        callback: function ()
        {
            Phaser.Geom.Ellipse.Random(ellipse2, light2);
        },
        callbackScope: this,
        repeat: -1
    });

    this.lights.enable().setAmbientColor(0x333333);


}

function update() {
    player.update();
}