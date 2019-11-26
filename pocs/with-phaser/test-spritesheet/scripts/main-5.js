var config = {
    type: Phaser.WEBGL,
    width: 1960,
    height: 1080,
    backgroundColor: '#ababab',
    parent: 'la-diagonale-du-poulpe',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    //this.load.atlas('tubes-waves', 'images/waves/waves-tubes.png', 'images/waves/waves-tubes.json');

    this.load.path = 'images/waves/';

    this.load.multiatlas('tubes-waves', 'waves-tubes.json');

}

function create() {
    //this.sprite = this.add.sprite(300, 300, 'tubes-waves');
    // const animations = this.anims.generateFrameNames('idle', 1, 3);

    const capguy = this.add.sprite(200, 400, 'tubes-waves', '001.png');

    var frameNames = this.anims.generateFrameNames('tubes-waves', {
        start: 1, end: 3, 
        zeroPad: 3,
        suffix: '.png'
    });

    this.anims.create({ key: 'up', frames: frameNames, frameRate: 3, repeat: -1 });
    capguy.anims.play('up');
}

function update() {

}