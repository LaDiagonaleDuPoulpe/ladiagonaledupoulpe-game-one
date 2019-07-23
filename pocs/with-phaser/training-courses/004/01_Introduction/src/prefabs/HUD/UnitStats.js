import Prefab from '../Prefab';
import TextPrefab from '../TextPrefab';

class UnitStats extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.stats = Object.create(properties.stats);
        
        this.face_texture = properties.face_texture;
    }
    
}

export default UnitStats;