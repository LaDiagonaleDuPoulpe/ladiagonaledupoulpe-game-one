import Prefab from '../Prefab';

class MenuItem extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.setInteractive();
        this.on('pointerdown', this.select.bind(this));
    }
    
    select () {
        console.log(this.name + ' selected');
    }
    
}

export default MenuItem;