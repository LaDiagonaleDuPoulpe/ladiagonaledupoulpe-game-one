import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'characters', 325);
        this.scene = scene;
        
        console.log('Player', 'constructor');           
        
        this.initialize();
    }
    
    initialize() {
        console.log('init ? ');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        this.setScale(4);
        console.log('scale ?!');
    }
    
    update(cursors) {
        this.setVelocity(0);
        // check if the up or down key is pressed
        if (cursors.up.isDown) {
            this.setVelocityY(-150);
        } else if (cursors.down.isDown) {
            this.setVelocityY(150);
        }
        // check if the left or right key is pressed
        if (cursors.left.isDown) {
            this.setVelocityX(-150);
        } else if (cursors.right.isDown) {
            this.setVelocityX(150);
        }
    }
}