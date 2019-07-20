import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spriteIndex) {
        super(scene, x, y, 'characters', spriteIndex);
        this.scene = scene;
        this.health = 3;
        
        console.log('Player', 'constructor');           
        
        this.initialize();
    }
    
    initialize() {
        console.log('init ? ');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        
        this.setScale(4);
        console.log('scale ?!');
        
        this.timeEvent = this.scene.time.addEvent({
            delay: 3000,
            callback: this.move,
            loop: true,
            callbackScope: this
        });
    }

    loseHealth() {
        this.health --;
        this.tint = 0xff0000;

        if(this.health <= 0) {
            this.timeEvent.destroy();
            this.destroy();
        } else {
            this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.tint = 0xffffff;
                }
            });
        }
    }
    
    move() {
        const randNumber = Math.floor((Math.random() * 4) + 1);
        switch (randNumber) {
            case 1:
            this.setVelocityX(100);
            break;
            case 2:
            this.setVelocityX(-100);
            break;
            case 3:
            this.setVelocityY(100);
            break;
            case 4:
            this.setVelocityY(-100);
            break;
            default:
            this.setVelocityX(100);
        }
        
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setVelocity(0);
            },
            callbackScope: this
        });
    }
    
}