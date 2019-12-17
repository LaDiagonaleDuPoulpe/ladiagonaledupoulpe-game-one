
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
    this.load.setPath('assets/images/Octo2 PNGs/octo3 down all');
    this.load.multiatlas('character_sheet_down', 'octo3-down-all.json');
}

var light1 = null;
var light2 = null;

var character = null;
function create() {
    //this.stage.backgroundColor = 0x4488cc;
    //character = this.add.image(200, 200, 'character');

    //character = this.add.sprite(500, 500, 'character');

    var capguy_anim = this.add.sprite(500, 500, 'character_sheet_down');
    capguy_anim.setPipeline('Light2D');


    //var frameNames = this.anims.generateFrameNames('character_sheet', { start: 1, end: 5 });
    var frameNames = this.anims.generateFrameNames('character_sheet_down', { zeroPad: 3, prefix: 'octo3 down all_', suffix: '.png', start: 0, end: 15 });
    this.anims.create({ key: 'idle', frames: frameNames, frameRate: 15, repeat: -1 });
    capguy_anim.anims.play('idle');
    
    //this.cameras.main.fadeIn(6000);

    light1 = this.lights.addLight(1300, 300, 500).setColor(0xffffff).setIntensity(2);
    var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 70, 100);

    light2 = this.lights.addLight(10, 600, 500).setColor(0xffffff).setIntensity(2);
    var ellipse2 = new Phaser.Geom.Ellipse(light2.x, light2.y, 70, 1200);

    capguy_anim.setPipeline('Light2D');

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