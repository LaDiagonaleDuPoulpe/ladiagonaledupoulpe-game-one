

export class MainScene extends Phaser.Scene {
    private objects = {};
    
    constructor(key: string) {
        super({
            key: 'MainScene'
        });
    }
    
    preload() {
        console.log('MainScene::preload');
        this.load.image('image', 'assets/sprites/mushroom2.png');
    }
    
    init() {
        console.log('MainScene::init');
        
        
    }
    
    create() {        
        const object: any = (<any>this.objects);
        
        object.camera = this.cameras.add(0, 0, 400, 300);
        object.image0 = this.add.image(400, 300, 'image');
        object.move = 0.0;
        object.camera.zoom = 0.5;
        object.camera.scrollX = 200;
        object.camera.scrollY = 150;
        object.camera.setBackgroundColor('rgba(255, 0, 0, 0.5)');
    }
    
    update (time, delta) {
        super.update(time, delta);
        const object: any = (<any>this.objects);

        object.image0.x = 400 + Math.cos(object.move) * 300;
        object.move += 0.02;

    }
}