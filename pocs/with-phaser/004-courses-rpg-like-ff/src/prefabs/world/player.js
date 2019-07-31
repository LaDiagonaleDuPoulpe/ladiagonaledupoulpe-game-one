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
    }
    //#endregion
    
    //#region internal methods
    moveByKeyDown() {
        if (this.moveLeft.isDown && this.body.velocity.x <= 0) {
            this.body.velocity.x = -this.walkingSpeed;
        } else if(this.moveRight.isDown && this.body.velocity.x >= 0) {
            this.body.velocity.x = this.walkingSpeed;
        } else {
            this.body.velocity.x = 0;
        }

        if (this.moveUp.isDown && this.body.velocity.y <= 0) {
            this.body.velocity.y = -this.walkingSpeed;
        } else if(this.moveDown.isDown && this.body.velocity.y >= 0) {
            this.body.velocity.y = this.walkingSpeed;
        } else {
            this.body.velocity.y = 0;
        }
    }

    attachPlayerMovments() {
        this.moveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.moveUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.moveDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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