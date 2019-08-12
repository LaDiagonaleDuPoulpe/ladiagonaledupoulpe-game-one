import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class MenuItem extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods   
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.setInteractive();
        this.on('pointerDown', this.select.bind(this));
    }     

    /**
     * Selects one menu
     */
    select() {
        console.log(this.name + ' selected');
    }
    //#endregion
}

export default MenuItem;