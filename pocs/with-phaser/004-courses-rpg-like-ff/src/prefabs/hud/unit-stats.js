import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import TextPrefab from '../text-prefab';

/**
 * Displaying stats of one unit
 */
class UnitStats extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods 
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.stats = Object.create(properties.stats);
        this.faceTexture = properties.faceTexture;
    }     
    //#endregion
}

export default UnitStats;