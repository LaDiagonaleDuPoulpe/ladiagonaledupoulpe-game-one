import Prefab from '../Prefab';

class Player extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.walking_speed = +properties.walking_speed;
        
        this.body.collideWorldBounds = true;
        
        this.scene.physics.add.collider(this, this.scene.layers.buildings);
        
        this.moving = {left: false, right: false, up: false, down: false};
        
        if (!this.scene.anims.anims.has('walking_down')) {
            this.scene.anims.create({
                key: 'walking_down',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [0, 4, 8, 12]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_up')) {
            this.scene.anims.create({
                key: 'walking_up',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [1, 5, 9, 13]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_left')) {
            this.scene.anims.create({
                key: 'walking_left',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [2, 6, 10, 14]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has('walking_right')) {
            this.scene.anims.create({
                key: 'walking_right',
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [3, 7, 11, 15]}),
                frameRate: 6,
                repeat: -1
            });
        }
        
        this.stopped_frames = [0, 1, 0, 2, 3]
    }
    
    update () {
        if (this.body) {
            if (this.moving.left && this.body.velocity.x <= 0) {
                this.body.velocity.x = -this.walking_speed;
                if (this.body.velocity.y === 0) {
                    this.anims.play('walking_left', true);
                }
            } else if (this.moving.right && this.body.velocity.x >= 0) {
                this.body.velocity.x = this.walking_speed;
                if (this.body.velocity.y === 0) {
                    this.anims.play('walking_right', true);
                }
            } else {
                this.body.velocity.x = 0;
            }

            if (this.moving.up && this.body.velocity.y <= 0) {
                this.body.velocity.y = -this.walking_speed;
                if (this.body.velocity.x === 0) {
                    this.anims.play('walking_up', true);
                }
            } else if (this.moving.down && this.body.velocity.y >= 0) {
                this.body.velocity.y = this.walking_speed;
                if (this.body.velocity.x === 0) {
                    this.anims.play('walking_down', true);
                }
            } else {
                this.body.velocity.y = 0;
            }

            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.anims.stop();
                this.setFrame(this.stopped_frames[this.body.facing - 10]);
            } 
        }
    }
    
    change_movement(direction, move) {
        this.moving[direction] = move;
    }
    
    stop () {
        this.moving = {left: false, right: false, up: false, down: false};
    }
}

export default Player;