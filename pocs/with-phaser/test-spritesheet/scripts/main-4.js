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
    this.load.atlas('mysprite', 'images/spritesheet.png', 'images/sprites.json');
}

function create() {
    this.sprite = this.add.sprite(100, 300, 'mysprite');
    const animations = this.anims.generateFrameNames('idle', 1, 6);
    //this.sprite.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 6), 5, true);
}

function update() {

}