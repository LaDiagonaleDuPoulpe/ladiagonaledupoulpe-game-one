import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { basename } from 'path';

/**
 * Defines default unit 
 * Unit is prefab with spritesheet animation
 */
export abstract class BaseUnit extends PrefabSprite {
    //#region fields
    private startingAnimationKey: string;
    //#endregion

    constructor(_scene: BaseLevelScene, 
        _name: string, 
        _position: Position, 
        _properties: PropertiesSetting) {
        super(_scene, _name, _position, _properties);
    }

    //#region protected methods
    protected initialize() {
        super.initialize();

        this.prepareAnimations(this.name, this.properties);

        if (this.startingAnimationKey) {
            this.anims.play(this.startingAnimationKey);
        }
    }
    //#endregion

    //#region internal methods
    private prepareAnimations(name: string, properties: PropertiesSetting) {
        this.startingAnimationKey = this.createAnimation('idle', name, properties);
    }

    private createAnimation(animationName, spriteName: string, properties: PropertiesSetting): string {
        const animationKey = spriteName + '_' + animationName;

        if (! this.scene.anims.exists(animationKey)) {
            const animationObject = properties.animations.find((item) => item.key == animationName);

            const frameConfig = {
                frames: animationObject.frames
            };

            const frames = this.scene.anims.generateFrameNumbers(properties.texture, frameConfig);
            
            this.scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: animationObject.fps,
                repeat: animationObject.repeat 
            });
        }

        return animationKey;
    }
    //#endregion
}