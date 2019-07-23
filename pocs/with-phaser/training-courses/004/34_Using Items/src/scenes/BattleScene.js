import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import Unit from '../prefabs/battle/Unit';
import PlayerUnit from '../prefabs/battle/PlayerUnit';
import EnemyUnit from '../prefabs/battle/EnemyUnit';
import MenuItem from '../prefabs/HUD/MenuItem';
import PhysicalAttackMenuItem from '../prefabs/HUD/PhysicalAttackMenuItem';
import MagicalAttackMenuItem from '../prefabs/HUD/MagicalAttackMenuItem';
import RunMenuItem from '../prefabs/HUD/RunMenuItem';
import InventoryMenuItem from '../prefabs/HUD/InventoryMenuItem';
import EnemyMenuItem from '../prefabs/HUD/EnemyMenuItem';
import Menu from '../prefabs/HUD/Menu';
import ShowPlayerUnit from '../prefabs/HUD/ShowPlayerUnit';
import PriorityQueue from '../priority-queue.min.js'

class BattleScene extends JSONLevelScene {
    constructor() {
        super('BattleScene');
        
        this.prefab_classes = {
            background: Prefab.prototype.constructor,
            player_unit: PlayerUnit.prototype.constructor,
            enemy_unit: EnemyUnit.prototype.constructor,
            menu_item: MenuItem.prototype.constructor,
            physical_attack_menu_item: PhysicalAttackMenuItem.prototype.constructor,
            magical_attack_menu_item: MagicalAttackMenuItem.prototype.constructor,
            run_menu_item: RunMenuItem.prototype.constructor,
            enemy_menu_item: EnemyMenuItem.prototype.constructor,
            inventory_menu_item: InventoryMenuItem.prototype.constructor,
            menu: Menu.prototype.constructor,
            show_player_unit: ShowPlayerUnit.prototype.constructor
        }
        
        this.rnd = new Phaser.Math.RandomDataGenerator();
    }
    
    init (data) {
        super.init(data);
        
        this.previous_level = data.extra_parameters.previous_level;
        
        this.encounter = data.extra_parameters.encounter;
    }
    
    preload () {
        this.load.json('experience_table', 'assets/levels/experience_table.json');
    }
    
    create () {
        super.create();
        
        this.experience_table = this.cache.json.get('experience_table');
        
        for (let enemy_unit_name in this.encounter.enemy_data) {
            this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
        }
        
        for (let player_unit_name in this.cache.game.party_data) {
            let unit_data = this.cache.game.party_data[player_unit_name];
            this.prefabs[player_unit_name].stats = {};
            for (let stat_name in unit_data.stats) {
                this.prefabs[player_unit_name].stats[stat_name] = unit_data.stats[stat_name];
            }
            this.prefabs[player_unit_name].experience = unit_data.experience;
            this.prefabs[player_unit_name].current_level = unit_data.current_level;
        }
        
        console.log(this.prefabs.warrior.stats);
        console.log(this.prefabs.warrior.experience);
        console.log(this.prefabs.warrior.current_level);
        
        this.units = new PriorityQueue({comparator: function (unit_a, unit_b) {
            return unit_a.act_turn - unit_b.act_turn;
        }});
        
        this.groups.player_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);
        
        this.groups.enemy_units.children.each(function (unit) {
            unit.calculate_act_turn(0);
            this.units.queue(unit);
        }, this);
        
        console.log(this.units);
        
        this.cache.game.inventory.collect_item(this, {"type": "potion", "properties": {"group": "items", "item_texture": "potion_image", "health_power": 50}});
        
        this.cache.game.inventory.create_menu(this, this.prefabs.items_menu);
        
        this.next_turn();
    }
    
    next_turn () {
        if (this.groups.enemy_units.countActive() === 0) {
            this.end_battle();
            return;
        }
        
        if (this.groups.player_units.countActive() === 0) {
            this.game_over();
            return;
        }
        
        this.current_unit = this.units.dequeue();
        if (this.current_unit.active) {
            this.current_unit.act();
            this.current_unit.calculate_act_turn(this.current_unit.act_turn);
            this.units.queue(this.current_unit);
        } else {
            this.next_turn();
        }
    }
    
    back_to_world () {
        this.scene.start('BootScene', {scene: this.previous_level});
    }
    
    game_over () {
        this.scene.start('BootScene', {scene: 'title'});
    }
    
    end_battle () {
        let received_experience = this.encounter.reward.experience;
        
        this.groups.player_units.children.each(function (player_unit) {
            player_unit.receive_experience(received_experience / this.groups.player_units.children.size);
            
            this.cache.game.party_data[player_unit.name].stats = player_unit.stats;
            this.cache.game.party_data[player_unit.name].experience = player_unit.experience;
            this.cache.game.party_data[player_unit.name].current_level = player_unit.current_level;
        }, this);
        
        this.encounter.reward.items.forEach(function (item_object) {
            this.cache.game.inventory.collect_item(this, item_object);
        }, this);
        
        this.back_to_world();
    }

}

export default BattleScene;