import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
 * Unit (player or enemy)
 */
class Unit extends Prefab {

    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
    }

    //#region public methods  
    /**
     * Lanuches an action 
     */
    playAction() {
        throw new Error('not implemented');
    }

    /**
     * Calculates current attack turn
     * @param {number} currentTurn 
     */
    calculateAttackTurn(currentTurn) {
        console.log('calculateAttackTurn', currentTurn);
        if (!currentTurn) {
            currentTurn = this.attackTurn;
        }

        this.attackTurn = currentTurn + Math.ceil(100 / this.stats.speed);
    }
    //#endregion

    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.createAnimations(name, properties);
        this.attachEvents();

        this.anims.play(this.startingAnimationKey);

        this.stats = properties.stats;
    }
    //#endregion

    //#region internal methods
    receiveDamage(damage) {
        if (this.scene) {
            this.stats.health -= damage;
            this.anims.play(this.name + '_' + 'hit');

            this.displayDamageText(damage);
            if (this.stats.health <= 0) {
                this.stats.health = 0;
                this.destroy();
            }
        }
    }

    displayDamageText(damage) {
        const damageText = this.scene.add.text(this.x, this.y - 50, '' + damage, { font: 'bold 24px Kells', fill: '#ff0000' }, this.scene.groups.hud);

        this.timeEvent = this.scene.time.addEvent({ delay: 1000, callback: damageText.destroy, callbackScope: damageText });
    }

    /**
    * Compute damages to put on unit target
    * @param {Unit} target 
    */
    computeDamage(target) {
        const attackMultiplier = this.scene.random.realInRange(0.8, 1.2);
        const defenseMultiplier = this.scene.random.realInRange(0.8, 1.2);

        const realAttackPoints = attackMultiplier * this.stats.attack;
        const realDefenseUnitPoints = defenseMultiplier * target.stats.defense;
        let damage = Math.max(0, Math.round(realAttackPoints - realDefenseUnitPoints));

        return damage;
    }

    /**
     * Gets active unit in battle scene
     */
    getActiveUnit() {
        const targetGroup = this.scene.groups[this.targetUnits];
        const targetIndex = this.scene.random.between(0, targetGroup.countActive() - 1);
        let target = undefined;

        let i = 0;
        targetGroup.children.each(unit => {
            if (unit.active) {
                if (i == targetIndex) {
                    target = unit;
                }
                i++;
            }
        }, this);


        return target;
    }

    createAnimations(name, properties) {
        this.startingAnimationKey = this.createAnimation('idle', name, properties);
        this.createAnimation('attack1', name, properties);
        this.createAnimation('attack2', name, properties);
        this.createAnimation('hit', name, properties);
    }

    /**
    * Attachs on events (complete, ...)
    */
    attachEvents() {
        this.on('animationcomplete', this.backToIdle.bind(this));
    }

    /**
    * After battle, go back to idle animation
    */
    backToIdle(animation) {
        this.anims.play(this.startingAnimationKey);

        const beginingKey = this.name + '_' + 'attack';
        if (animation.key.startsWith(beginingKey)) {
            this.scene.goToNextTurn();
        }
    }

    /**
    * Creates an animation and return the animationKey
    * @param {string} name 
    * @param {string} animationName
    * @returns Returns animation key 
    */
    createAnimation(animationName, name, properties) {
        const animationKey = name + '_' + animationName;

        if (!this.scene.anims.anims.has(animationKey)) {
            const frameConfig = {
                frames: properties.animations[animationName].frames,
            };
            const frames = this.scene.anims.generateFrameNumbers(this.texture.key, frameConfig);

            this.scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: properties.animations[animationName].fps,
                //repeat: -1 // repeat animation
            });
        }

        return animationKey;
    }
    //#endregion
}

export default Unit;