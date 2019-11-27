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
    this.load.spritesheet('tube-waves', 'images/waves/waves-tubes.png', { frameWidth: 506, frameHeight: 178 });
}

function create() {
    createAnimations.call(this);
}

function createAnimations() {
    console.log('this :', this);
    createAnimation.call(this, 'idle');
}

function createAnimation(animationKey) {

    const generatedFrames = this.anims.generateFrameNumbers('tube-waves');

    console.log('frames :', generatedFrames);

    this.anims.create({
        key: animationKey,
        frames: generatedFrames,
        frameRate: 2,
        repeat: -1 // repeat animation
    });

    var sprite = this.add.sprite(200, 300);

    sprite.play(animationKey);

}

function update() {

}