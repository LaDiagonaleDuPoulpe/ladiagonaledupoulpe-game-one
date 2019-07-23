import Prefab from '../Prefab';

class Item extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.item_texture = properties.item_texture;
    }
}

export default Item;
