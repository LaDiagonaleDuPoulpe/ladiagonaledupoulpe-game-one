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
}