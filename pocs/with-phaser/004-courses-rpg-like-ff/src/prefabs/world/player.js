import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Player extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }
    
    //#region public methods
    update() {
        if (this.body) {
            this.moveByKeyDown();
        }
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

    /**
     * Activates direction of the player
     * @param {string} direction 
     * @param {boolean} isMoving 
     */
    changeMovement(direction, isMoving) {
        this.movingDirections[direction] = isMoving;
    }
    //#endregion
    
    //#region internal methods
    moveByKeyDown() {
        console.log('moveByKeyDown->velocity.x', this.body.velocity.x);
        console.log('moveByKeyDown->velocity.y', this.body.velocity.y);
        
        this.moveHorizontal();
        this.moveVertical();        
        
        this.stopCurrentAnimation();   
    }
    
    moveVertical() {
        if (this.movingDirections.up && this.body.velocity.y <= 0) {
            this.body.velocity.y = -this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_up', true);
            }
        } else if(this.movingDirections.down && this.body.velocity.y >= 0) {
            this.body.velocity.y = this.walkingSpeed;
            if (this.body.velocity.x === 0) {
                this.anims.play('walking_down', true);
            }
        } else {
            this.body.velocity.y = 0;
        }
    }
    
    moveHorizontal() {
        if (this.movingDirections.left && this.body.velocity.x <= 0) {
            this.body.velocity.x = -this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_left', true);
            }
        } else if(this.movingDirections.right && this.body.velocity.x >= 0) {
            this.body.velocity.x = this.walkingSpeed;
            if (this.body.velocity.y === 0) {
                this.anims.play('walking_right', true);
            }
        } else {
            this.body.velocity.x = 0;
        }
    }
    
    stopCurrentAnimation() {
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.anims.stop();
            this.displayCurrentFrameFromDirection();
        }
    }
    
    displayCurrentFrameFromDirection() {
        console.log('displayCurrentFrameFromDirection->this.body.facing - 10 :', this.body.facing - 10);
        this.setFrame(this.stoppedAnimationFrames[this.body.facing - 10]);
    }
    
    attachPlayerMovments() {
        this.movingDirections = {
            left: false,
            right: false,
            up: false,
            down: false
        };
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
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, { frames: [0 + spriteLevel, 
                    4 + spriteLevel, 
                    8 + spriteLevel, 
                    12 + spriteLevel] }),
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