import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'characters', 325);
        this.scene = scene;
        
        this.health = 3;
        this.hitDelay = false;
        this.direction = 'up';
        
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
    
    loseHealth() {
        this.health --;
        
        this.scene.events.emit('loseHealth', this.health);
        
        if(this.health <= 0) {
            this.scene.loadNextLevel(true);
        }
    }
    
    update(cursors) {
        this.setVelocity(0);
        // check if the up or down key is pressed
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
    
    enemyCollision(player, enemy) {
        console.log('collision');
        
        if(! this.hitDelay) {
            this.loseHealth();
            this.hitDelay = true;
            
            this.tint = 0xff0000;
            
            this.scene.time.addEvent({
                delay: 1200,
                callback: () => {
                    this.hitDelay = false;
                    this.tint = 0xffffff;
                },
                callbackScope: this
            });
        }
    }
}