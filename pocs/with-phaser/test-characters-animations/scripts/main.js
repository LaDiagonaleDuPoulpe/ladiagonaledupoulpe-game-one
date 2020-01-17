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
    this.load.spritesheet('octopus', 'assets/images/octo3-down-camo-cut.png', { frameWidth: 500, frameHeight: 500 });
}

function create() {
    createOneAnimation.call(this, 'octopus', 'down');
}

function update() {
}

function createOneAnimation(spriteKey, animationKey) {
    const generatedFrames = this.anims.generateFrameNumbers(spriteKey, {start:0, end: 44 });

    this.anims.create({
        key: animationKey,
        frames: generatedFrames,
        frameRate: 30,
        repeat: -1 // repeat animation
    });

    var sprite = this.add.sprite(500, 300);

    sprite.play(animationKey);
}