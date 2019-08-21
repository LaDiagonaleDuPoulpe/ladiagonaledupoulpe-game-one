import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import Unit from './unit';
import PhysicalAttack from './physical-attack';
import EnemyUnit from './enemy-unit';
import MagicalAttack from './magical-attack';

/**
 * Boss unit (during a battle)
 */
class BossUnit extends EnemyUnit {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods  
    playAction() {
        switch (this.currentState) {
            case 'default': this.playDefaultAction();
                break;
            case 'special': this.playSpecialAction();
                break;
            case 'enraged': this.playEnragedAction();
                break;
        }
        this.selectNextState();
    }
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.SPECIAL_ATTACK_THRESHOLD = 0.5;
        this.prepareSpecialAttack();

        this.maxHealth = this.stats.health;
        this.enraged = false;
        this.currentState = 'default';
    }
    //#endregion

    //#region internal methods
    selectNextState() {
        this.currentState = 'default';

        switch (this.currentState) {
            case 'default': 
                if (this.stats.health < 0.5 * this.maxHealth && !this.enraged) {
                    this.enraged = true;
                    this.currentState = 'enraged';
                } else {
                    const randomValue = this.scene.random.frac();
                    if (randomValue < this.SPECIAL_ATTACK_THRESHOLD) {
                        this.currentState = 'special';
                    }
                }
                break;
        }

        console.log('selectNextState', this.currentState);
    }

    /**
     * Default action, as the same as parent
     */
    playDefaultAction() {
        console.log('default act');
        super.playAction();
    }

    /**
     * Special action
     */
    playSpecialAction() {
        console.log('special act');
        super.playActionWithAttack(this.specialAttack);
    }

    /**
     * Enraged action
     */
    playEnragedAction() {
        console.log('enraged act');
        this.scene.groups[this.targetUnits].children.each(target => {
            if (target.active) {
                this.specialAttack.hit(target);
            }
        }, this);
    }

    /**
     * Creates a special attack
     */
    prepareSpecialAttack() {
        const position = {
            x: 0,
            y: 0
        };

        const setting = {
            group: 'attacks',
            owner: this
        };

        this.specialAttack = new MagicalAttack(this.scene, this.name + 'SpecialAttack', position, setting);

    }
    //#endregion
}

export default BossUnit;