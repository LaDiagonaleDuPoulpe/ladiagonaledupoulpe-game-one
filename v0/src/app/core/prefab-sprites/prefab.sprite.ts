import { Position } from "../models/position";
import { PropertiesSetting } from "../models/properties-setting";
import { BaseLevelScene } from "../scenes/base-level.scene";
import { AnimationsCreator } from './animations/animations-creator';
import { EffectType } from "../models/prefabs/effect-type";

/**
 * Sprite adding in scene : could be image or animated image
 */
export abstract class PrefabSprite extends Phaser.GameObjects.Sprite {
    constructor(protected _scene: BaseLevelScene, 
                private _name: string, 
                protected _position: Position, 
                protected _properties: PropertiesSetting,
                protected _animationsCreator: AnimationsCreator) {
        super(_scene, _position.x, _position.y, _properties.texture);

        this.setActive(true);
        this._scene.addSprite(this, this._properties.group);

        this.name = this._name;

        this.initialize();
    }

    //#region Public methods
    //#endregion

    //#region internal methods
    /**
     * Initializes the sprite prefab
     */
    protected initialize() {
        if (this._properties.anchor) {
            this.setOrigin(this._properties.anchor.x, this._properties.anchor.y);
        }

        if (this._properties.scale) {
            this.setScale(this._properties.scale.x, this._properties.scale.y);
        }

        if (this._properties.depth) {
            this.setDepth(this._properties.depth);
        }

        if (typeof this._properties.visible !== "undefined") {
            this.visible = this._properties.visible;
        }
    }
    //#endregion

    //#region Properties
    /** Gets damage value */
    public get collisionDamage(): number {
        let value = 0;

        if (this.properties.effects && this.properties.effects.length > 0) {
            const effect = this.properties.effects.find(item => item.type === EffectType.collision);

            if (effect) {
                value = +effect.value; 
            }
        }

        return value;
    }

    /**
     * Gets the json properties of the prefab
     */
    protected get properties(): PropertiesSetting {
        return this._properties;
    }
    //#endregion
}