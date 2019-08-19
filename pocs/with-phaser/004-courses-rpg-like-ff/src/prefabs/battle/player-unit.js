import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Unit from './unit';

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
    playAction() {
        this.scene.activateActionsMenu();
    }
    //#endregion
    
}

export default PlayerUnit;