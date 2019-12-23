
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
    this.load.setPath('assets/images/Octo2 PNGs');
    this.load.multiatlas('character_sheet_all', 'octo3 all/octo3-all.json');

    // this.load.multiatlas('character_sheet_top', 'octo3 up all/octo3-top-all.json');
    // this.load.multiatlas('character_sheet_right', 'octo3 right all/octo3-right-all.json');
}

var light1 = null;
var light2 = null;
var capguy_anim = null;

var character = null;
function create() {
    //this.stage.backgroundColor = 0x4488cc;
    //character = this.add.image(200, 200, 'character');

    //character = this.add.sprite(500, 500, 'character');

    capguy_anim = this.physics.add.sprite(500, 500, 'character_sheet_all');
    capguy_anim.setPipeline('Light2D');

    this.physics.world.enable(capguy_anim);

    //var frameNames = this.anims.generateFrameNames('character_sheet', { start: 1, end: 5 });
    var frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 down all_', suffix: '.png', start: 0, end: 15 });
    this.anims.create({ key: 'idle-down', frames: frameNames, frameRate: 15, repeat: -1 });
    //capguy_anim.anims.play('idle');

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 down all_', suffix: '.png', start: 45, end: 65 });
    this.anims.create({ key: 'walk-down', frames: frameNames, frameRate: 25, repeat: -1 });
    

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 left all_', suffix: '.png', start: 0, end: 15 });
    this.anims.create({ key: 'idle-left', frames: frameNames, frameRate: 15, repeat: -1 });
    //capguy_anim.anims.play('idle');

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 left all_', suffix: '.png', start: 45, end: 69 });
    this.anims.create({ key: 'walk-left', frames: frameNames, frameRate: 25, repeat: -1 });

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 right all_', suffix: '.png', start: 0, end: 15 });
    this.anims.create({ key: 'idle-right', frames: frameNames, frameRate: 15, repeat: -1 });
    // //capguy_anim.anims.play('idle');

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 right all_', suffix: '.png', start: 45, end: 69 });
    this.anims.create({ key: 'walk-right', frames: frameNames, frameRate: 25, repeat: -1 });

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 up all_', suffix: '.png', start: 0, end: 15 });
    this.anims.create({ key: 'idle-top', frames: frameNames, frameRate: 15, repeat: -1 });
    // //capguy_anim.anims.play('idle');

    frameNames = this.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 up all_', suffix: '.png', start: 45, end: 69 });
    this.anims.create({ key: 'walk-top', frames: frameNames, frameRate: 25, repeat: -1 });
    
    capguy_anim.anims.play('walk-down');

    //this.cameras.main.fadeIn(6000);

    light1 = this.lights.addLight(100, 300, 500).setColor(0xffffff).setIntensity(2);
    var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 700, 1000);

    light2 = this.lights.addLight(10, 600, 500).setColor(0xffffff).setIntensity(2);
    var ellipse2 = new Phaser.Geom.Ellipse(light2.x, light2.y, 700, 1200);

    //capguy_anim.setPipeline('Light2D');

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

    // this.input.on('pointermove', function (pointer) {

    //     light1.x = pointer.x;
    //     light1.y = pointer.y;

    //     console.log('pointer :', pointer);

    // });

    this.lights.enable().setAmbientColor(0x333333);

    this.input.keyboard.on('keydown_W', function (event) {
        capguy_anim.setVelocityY(15);
        capguy_anim.anims.play('walk-down');
    });

    this.input.keyboard.on('keydown_Q', function (event) {
        capguy_anim.setVelocityY(15);
        capguy_anim.anims.play('walk-left');
    });

    this.input.keyboard.on('keydown_Z', function (event) {
        capguy_anim.setVelocityY(-15);
        capguy_anim.anims.play('walk-top');
    });

    this.input.keyboard.on('keydown_D', function (event) {
        capguy_anim.setVelocityY(-15);
        capguy_anim.anims.play('walk-right');
    });


    this.cameras.main.startFollow(capguy_anim);
}

function update() {
    
}