import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Player extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods
    update() {
        this.moveByKeyDown();
    }
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.defineCollisionSettings();
        this.defineWalkingSpeed(properties);
        this.attachPlayerMovments();
        this.prepareAnimationsByMovment();
    }
    //#endregion
    
    //#region internal methods
    moveByKeyDown() {
        if (this.moveLeft.isDown && this.body.velocity.x <= 0) {
            this.body.velocity.x = -this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_left', true);
            }
        } else if(this.moveRight.isDown && this.body.velocity.x >= 0) {
            this.body.velocity.x = this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_right', true);
            }
        } else {
            this.body.velocity.x = 0;
        }

        if (this.moveUp.isDown && this.body.velocity.y <= 0) {
            this.body.velocity.y = -this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_up', true);
            }
        } else if(this.moveDown.isDown && this.body.velocity.y >= 0) {
            this.body.velocity.y = this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_down', true);
            }
        } else {
            this.body.velocity.y = 0;
        }

        this.stopCurrentAnimation();   
    }

    stopCurrentAnimation() {
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.stop();
            this.displayCurrentFrameFromDirection();
        }
    }
    
    displayCurrentFrameFromDirection() {
        this.setFrame(this.stoppedAnimationFrames[this.body.facing - 10]);
    }

    attachPlayerMovments() {
        this.moveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.moveUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.moveDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    prepareAnimationsByMovment() {
        this.prepareOneAnimationByMovment('down', 0);
        this.prepareOneAnimationByMovment('up', 1);
        this.prepareOneAnimationByMovment('left', 2);
        this.prepareOneAnimationByMovment('right', 3);

        this.stoppedAnimationFrames = [0, 1, 0, 2, 3];
    }

    prepareOneAnimationByMovment(direction, spriteLevel = 0) {
        const directionKey = `walking_${direction}`;

        if(! this.scene.anims.anims.has(directionKey)) {
            this.scene.anims.create({
                key: directionKey,
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0 + spriteLevel, 4 + spriteLevel, 8 + spriteLevel, 12 + spriteLevel] }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
    
    defineWalkingSpeed(properties) {
        this.walkingSpeed = +properties.walkingSpeed;
    }
    
    defineCollisionSettings() {
        this.body.collideWorldBounds = true;
        this.scene.physics.add.collider(this, this.scene.layers.buildings);
    }
    //#endregion
}

export default Player;