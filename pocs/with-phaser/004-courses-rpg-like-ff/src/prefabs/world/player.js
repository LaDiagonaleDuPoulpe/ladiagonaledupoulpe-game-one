import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Player extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    update() {
        
    }

    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.defineCollisionSettings();
        this.defineWalkingSpeed(properties);
        this.attachPlayerMovments();
    }

    attachPlayerMovments() {
        this.moveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.moveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.moveUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.moveDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    defineWalkingSpeed(properties) {
        this.walkingSpeed = +properties.walkingSpeed;
        this.body.velocity.x = -this.walkingSpeed;
    }

    defineCollisionSettings() {
        this.body.collideWorldBounds = true;
        this.scene.physics.add.collider(this, this.scene.layers.buildings);
    }
}

export default Player;