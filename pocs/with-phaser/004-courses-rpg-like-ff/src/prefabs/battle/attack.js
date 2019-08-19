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

        this.doMoreActionsDuringHit();

        this.owner.anims.play(this.owner.name + '_' + this.defineAnimationToPlay());
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.owner = properties.owner;
    }

    /**
     * Defines the animation key to play
     */
    defineAnimationToPlay() {
        return 'attack1';
    }

    /**
     * Here, you can do everything more, by overriding method
     */
    doMoreActionsDuringHit() {
    }

    /**
     * Defines random value to attack multiplier
     */
    defineAttackMultiplier() {
        return this.scene.random.realInRange(0.8, 1.2);
    }

    /**
     * Defines random value to defense multiplier
     */
    defineDefenseMultiplier() {
        return this.scene.random.realInRange(0.8, 1.2);
    }

    /**
     * Defines the attack point value
     */
    getAttackPoint() {
        return this.owner.stats.attack;
    }
    //#endregion  
    
    //#region internal methods
    /**
    * Compute damages to put on unit target
    * @param {Unit} target 
    */
    computeDamage(target) {
        const attackMultiplier = this.defineAttackMultiplier();
        const defenseMultiplier = this.defineDefenseMultiplier();
        
        const realAttackPoints = attackMultiplier * this.getAttackPoint();
        const realDefenseUnitPoints = defenseMultiplier * target.stats.defense;
        let damage = Math.max(0, Math.round(realAttackPoints - realDefenseUnitPoints));
        
        return damage;
    }
    //#endregion
}

export default Attack;