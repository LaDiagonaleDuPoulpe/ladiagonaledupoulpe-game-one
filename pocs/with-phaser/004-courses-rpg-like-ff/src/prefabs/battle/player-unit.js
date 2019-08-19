import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
 * Enemy unit (during a battle)
 */
class PlayerUnit extends Unit {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods  
    /**
     * Launches an attack 
     */
    attack() {
        this.scene.activeMenu();
    }
    //#endregion
    
}

export default PlayerUnit;