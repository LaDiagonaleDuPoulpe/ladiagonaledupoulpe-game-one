import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';

class TitleScene extends JSONLevelScene {
    constructor() {
        super('TitleScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        }
    }
    
    preload () {
        this.load.json('default_data', 'assets/levels/default_data.json');
    }
    
    create () {
        super.create();
        
        this.cache.game.party_data = this.cache.json.get('default_data');
    }
    
    start_game() {
        this.scene.start('BootScene', {scene: 'town'});
    }
}

export default TitleScene;