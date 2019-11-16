const cbDirection = document.getElementById('cbdirection');



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
    this.load.spritesheet('octopus', 'images/octo-8-0.png', { frameWidth: 322, frameHeight: 361 });
}

function create() {
}

function update() {
}


cbDirection.onchange = function() {
    octopuses.forEach(octo => {
        octo.changeDirection(cbDirection.value);
    }, this);
}


class Ocotopus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'octopus');
        this.scene = scene;
        
        this.direction = 'up';
        
        console.log('Player', 'constructor');           
        
        this.initialize();
    }
    
    initialize() {
        console.log('init ? ');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        console.log('scale ?!');
    }

    update(cursors) {
        if (cursors.up.isDown) {
            this.setVelocityY(-150);
            this.direction = 'up';
        } else if (cursors.down.isDown) {
            this.setVelocityY(150);
            this.direction = 'down';
        }
        // check if the left or right key is pressed
        if (cursors.left.isDown) {
            this.setVelocityX(-150);
            this.direction = 'left';
        } else if (cursors.right.isDown) {
            this.setVelocityX(150);
            this.direction = 'right';
        }
    }
}