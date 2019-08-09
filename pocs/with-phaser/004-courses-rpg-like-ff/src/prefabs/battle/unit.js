import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

class Unit extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.startingAnimationKey = createAnimation('idle');
        createAnimation('attack1');
        createAnimation('attack2');
        createAnimation('hit');

        this.attachEvents();

        this.anims.play(this.startingAnimationKey);

        this.stats = properties.stats;
    }   
    //#endregion
    
    //#region internal methods
    /**
     * Attachs on events (complete, ...)
     */
    attachEvents() {
        this.on('animationcomplete', this.backToIdle.bind(this));
    }

    /**
     * After battle, go back to idle animation
     */
    backToIdle() {
        this.anims.play(this.startingAnimationKey);
    }

    /**
     * Creates an animation and return the animationKey
     * @param {string} name 
     * @param {string} animationName
     * @returns Returns animation key 
     */
    createAnimation(name, animationName) {
        const animationKey = name + '_' + animationName;

        if (this.scene.anims.anims.has(animationKey)) {
            const frameConfig = {
                frames: properties.animations[animationName].frames,
            };
            const frames = this.scene.anims.generateFrameNumbers(this.texture.key, frameConfig);
            
            this.scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: properties.animations[animationName].fps,
                repeat: -1
            });
        }

        return animationKey;
    }
    //#endregion
}

export default Unit;