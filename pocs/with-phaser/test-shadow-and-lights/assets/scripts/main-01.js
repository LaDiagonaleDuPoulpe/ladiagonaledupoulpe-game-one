
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
            debug: false
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
var character = null;
function create() {
    //this.stage.backgroundColor = 0x4488cc;
    character = this.add.image(200, 200, 'character');
    
    //this.cameras.main.fadeIn(6000);

    light1 = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);
    //var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 70, 100);

    character.setPipeline('Light2D');

    // this.time.addEvent({
    //     delay: 100,
    //     callback: function ()
    //     {
    //         Phaser.Geom.Ellipse.Random(ellipse1, light1);
    //     },
    //     callbackScope: this,
    //     repeat: -1
    // });

    this.input.on('pointermove', function (pointer) {

        light1.x = pointer.x;
        light1.y = pointer.y;

        console.log('pointer :', pointer);

    });

    this.lights.enable().setAmbientColor(0x333333);

}

function update() {
    
}