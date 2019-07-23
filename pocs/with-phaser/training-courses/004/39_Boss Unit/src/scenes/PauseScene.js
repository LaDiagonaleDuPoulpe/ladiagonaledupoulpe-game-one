import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import UnitStats from '../prefabs/HUD/UnitStats';
import ShowPlayerUnitInPauseScreen from '../prefabs/HUD/ShowPlayerUnitInPauseScreen'

class PauseScene extends JSONLevelScene {
    constructor() {
        super('PauseScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            unit_stats: UnitStats.prototype.constructor,
            show_player_unit: ShowPlayerUnitInPauseScreen.prototype.constructor
        }
    }
    
    init (data) {
        super.init(data);
        
        this.previous_level = data.extra_parameters.previous_level;
    }
    
    create () {
        super.create();
        
        for (let player_unit_name in this.cache.game.party_data) {
            let unit_data = this.cache.game.party_data[player_unit_name];
            this.prefabs[player_unit_name].stats = {};
            for (let stat_name in unit_data.stats) {
                this.prefabs[player_unit_name].stats[stat_name] = unit_data.stats[stat_name] + unit_data.stats_bonus[stat_name];
            }
            this.prefabs[player_unit_name].experience = unit_data.experience;
            this.prefabs[player_unit_name].current_level = unit_data.current_level;
        }
    }
    
    start_game() {
        this.scene.start('BootScene', {scene: 'town'});
    }
    
    back_to_world () {
        this.scene.start('BootScene', {scene: this.previous_level});
    }
}

export default PauseScene;