import Prefab from '../Prefab';
import PhysicalAttack from './PhysicalAttack';
import MagicalAttack from './MagicalAttack';
import EnemyUnit from './EnemyUnit';

class BossUnit extends EnemyUnit {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.SPECIAL_ATTACK_THRESHOLD = 0.5;
        
        this.special_attack = new MagicalAttack(this.scene, this.name + '_special_attack', {x: 0, y: 0}, {group: 'attacks', owner: this});
        
        this.max_health = this.stats.health;
        this.enraged = false;
        
        this.current_state = 'default';
    }
    
    act () {
        switch (this.current_state) {
            case 'default':
                this.default_act();
                break;
            case 'special':
                this.special_act();
                break;
            case 'enraged':
                this.enraged_act();
                break;
        }
        this.next_state();
    }
    
    next_state () {
        switch (this.current_state) {
            case 'default':
                if (this.stats.health < 0.5 * this.max_health && !this.enraged) {
                    this.enraged = true;
                    this.current_state = 'enraged';
                } else {
                    let random_number = this.scene.rnd.frac();
                    if (random_number < this.SPECIAL_ATTACK_THRESHOLD) {
                        this.current_state = 'special';
                    }
                }
                break;
            case 'special':
                this.current_state = 'default';
                break;
            case 'enraged':
                this.current_state = 'default';
                break;
        }
    }
    
    default_act () {
        this.scene.prefabs.show_player_unit.show(false);
        
        let target = this.choose_target();
        
        this.attack.hit(target);
    }
    
    special_act () {
        this.scene.prefabs.show_player_unit.show(false);
        
        let target = this.choose_target();
        
        this.special_attack.hit(target);
    }
    
    enraged_act () {
        this.scene.groups[this.target_units].children.each(function (target) {
            if (target.active) {
                this.special_attack.hit(target);
            }
        }, this);
    }
    
}

export default BossUnit;