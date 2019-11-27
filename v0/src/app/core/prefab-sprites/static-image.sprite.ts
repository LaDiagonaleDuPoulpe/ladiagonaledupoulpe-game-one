import { BaseLevelScene } from '../scenes/base-level.scene';
import { PropertiesSetting } from '../models/properties-setting';
import { Position } from '../models/position';

/**
 * Static image to be displayed in scene
 */
export class StaticImageSprite extends Phaser.GameObjects.Image {
    constructor(private _scene: BaseLevelScene, 
        private _name: string, 
        private _position: Position, 
        private _properties: PropertiesSetting) {
        super(_scene, _position.x, _position.y, _properties.texture, _properties.frame);

        this._scene.add.existing(this);

        if (this._properties.depth) {
            this.setDepth(this._properties.depth);
        }
    }
}