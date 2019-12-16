
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

console.log('game.state :', game.state);

function preload() {

    this.load.image('character', ['assets/images/down/octo3 down all_000.png', 'assets/images/down/octo3 down all_000_n.png']);
}

var light1 = null;
var light2 = null;

var character = null;
function create() {
    //this.stage.backgroundColor = 0x4488cc;
    character = this.add.image(200, 200, 'character');
    
    //this.cameras.main.fadeIn(6000);

    light1 = this.lights.addLight(700, 300, 500).setColor(0xffffff).setIntensity(2);
    var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 70, 100);

    light2 = this.lights.addLight(10, 600, 500).setColor(0xffffff).setIntensity(2);
    var ellipse2 = new Phaser.Geom.Ellipse(light2.x, light2.y, 70, 1200);

    character.setPipeline('Light2D');

    this.time.addEvent({
        delay: 50,
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

    // this.input.on('pointermove', function (pointer) {

    //     light1.x = pointer.x;
    //     light1.y = pointer.y;

    //     console.log('pointer :', pointer);

    // });

    this.lights.enable().setAmbientColor(0x333333);

}

function update() {
    
}