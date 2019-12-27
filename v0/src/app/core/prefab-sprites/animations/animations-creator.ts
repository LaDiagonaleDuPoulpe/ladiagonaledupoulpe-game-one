import { injectable } from "tsyringe";
import { PropertiesSetting } from '../../models/properties-setting';
import { Animation } from '../../models/animations/animation';
import { BaseLevelScene } from '../../scenes/base-level.scene';

/**
 * Creator of animations for one sprite, because of the needed texture to generated frames in animations list
 * It uses properties part of each prefab to know frame numbers 
 */
@injectable()
export class AnimationsCreator {
    //#region Public methods
    /**
     * Creates all animations for one sprite
     * @param sprite Sprite to get his texture
     * @param properties Properties where we can find animations array
     */
    createAll(sprite: Phaser.GameObjects.Sprite, scene: BaseLevelScene, properties: PropertiesSetting): string[] {
        let animationKeys:string[] = [];

        properties.animations.forEach(animation => {
            const key = this.createAnimation(animation, sprite, scene, properties);
            animationKeys.push(key);
        }, this);

        return animationKeys;
    }
    //#endregion

    //#region Internal methods
    private createAnimation(animation: Animation, 
                            sprite: Phaser.GameObjects.Sprite, 
                            scene: BaseLevelScene,
                            properties: PropertiesSetting): string {
        const animationKey = animation.key;
        const finalAnimationKey = sprite.name + '_' + animation.key;

        if (! scene.anims.exists(finalAnimationKey)) {
            const animationObject = properties.animations.find((item) => item.key == animationKey);

            const frameConfig = {
                frames: animationObject.frames,
                zeroPad: animationObject.zeroPad,
                prefix: animationObject.prefix,
                suffix: animationObject.suffix
            };

            const frames = scene.anims.generateFrameNumbers(properties.texture, frameConfig);
            
            const animation = scene.anims.create({
                key: finalAnimationKey,
                frames: frames,
                frameRate: animationObject.fps,
                repeat: animationObject.repeat
            });            
        }

        return finalAnimationKey;
    }
    //#endregion
} 