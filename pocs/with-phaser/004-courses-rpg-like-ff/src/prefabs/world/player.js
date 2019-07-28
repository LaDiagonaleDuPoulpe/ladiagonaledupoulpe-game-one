import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Player extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        
        this.scene.physics.add.existing(this);
        
        this.defineCollisionSettings();
        this.defineWalkingSpeed(properties);
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