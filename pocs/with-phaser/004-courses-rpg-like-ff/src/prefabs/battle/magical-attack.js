import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Attack from './attack';

/**
* Enemy unit (during a battle)
*/
class MagicalAttack extends Attack {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.manaCost = properties.manaCost;
    }

    defineAttackMultiplier() {
        return this.scene.random.realInRange(0.9, 1.3);
    }

    defineDefenseMultiplier() {
        return this.scene.random.realInRange(0.7, 1.1);
    }

    getAttackPoint() {
        return this.owner.stats.magicAttack;
    }

    doMoreActionsDuringHit() {
        this.owner.stats.mana -= this.manaCost;
    }

    defineAnimationToPlay() {
        return 'attack2';
    }
    //#endregion
}

export default MagicalAttack;