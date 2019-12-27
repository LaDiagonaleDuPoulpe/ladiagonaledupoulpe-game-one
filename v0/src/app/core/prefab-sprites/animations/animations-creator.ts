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
    private createAnimation(prefabAnimation: Animation, 
                            sprite: Phaser.GameObjects.Sprite, 
                            scene: BaseLevelScene,
                            properties: PropertiesSetting): string {
        const animationKey = prefabAnimation.key;
        const finalAnimationKey = sprite.name + '_' + prefabAnimation.key;

        if (! scene.anims.exists(finalAnimationKey)) {
            const animationObject = properties.animations.find((item) => item.key == animationKey);

            let frameConfig = null;
            let frames = null;
            if (prefabAnimation.frames) {
                frameConfig = { frames: prefabAnimation.frames };
                frames = scene.anims.generateFrameNumbers(properties.texture, frameConfig);
            }
            if (prefabAnimation.byName) {
                frameConfig = { 
                    prefix: prefabAnimation.prefix, 
                    suffix: prefabAnimation.suffix, 
                    zeroPad: prefabAnimation.zeroPad,
                    start: prefabAnimation.frameStart,
                    end: prefabAnimation.frameEnd
                 };
                frames = scene.anims.generateFrameNames(properties.texture, frameConfig);
            }
            
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