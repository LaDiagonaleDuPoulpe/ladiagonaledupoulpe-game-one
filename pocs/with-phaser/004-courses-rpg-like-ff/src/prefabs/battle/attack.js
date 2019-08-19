import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
* Enemy unit (during a battle)
*/
class Attack extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods
    /**
     * Launches an attack
     * @param {Unit} target 
     */
    hit(target) {
        const damage = this.computeDamage(target);        
        target.receiveDamage(damage);
        this.owner.anims.play(this.owner.name + '_' + 'attack1');
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.owner = properties.owner;
    }
    //#endregion  
    
    //#region internal methods
    /**
    * Compute damages to put on unit target
    * @param {Unit} target 
    */
    computeDamage(target) {
        const attackMultiplier = this.scene.random.realInRange(0.8, 1.2);
        const defenseMultiplier = this.scene.random.realInRange(0.8, 1.2);
        
        const realAttackPoints = attackMultiplier * this.owner.stats.attack;
        const realDefenseUnitPoints = defenseMultiplier * target.stats.defense;
        let damage = Math.max(0, Math.round(realAttackPoints - realDefenseUnitPoints));
        
        return damage;
    }
    //#endregion
}

export default Attack;