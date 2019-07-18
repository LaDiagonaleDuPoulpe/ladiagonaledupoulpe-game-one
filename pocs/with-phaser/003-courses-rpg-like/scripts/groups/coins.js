import 'phaser';

export default class Coins extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene, children, spriteArray) {
        super(world, scene);
        this.scene = scene;
        this.sprites = spriteArray;
        
        console.log('Coins', 'constructor');           
        
        this.initialize();
    }
    
    initialize() {        
        this.sprites.forEach(coin => {
            this.world.enableBody(coin,1);

            coin.body.setSize(coin.width * coin.scaleX,
                              coin.height * coin.scaleY,
                              true);


            coin.setScale(0.2);
            this.add(coin);
        });
        this.refresh();
    }

    collect(player, coin) {
        console.log('collect', coin);
        this.remove(coin);
        coin.destroy();

        this.scene.events.emit('coinCollected');
    }
}