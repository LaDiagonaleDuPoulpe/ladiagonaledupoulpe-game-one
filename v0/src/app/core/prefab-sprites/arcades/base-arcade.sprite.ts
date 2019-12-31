import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { PropertiesSetting } from '../../models/properties-setting';
import { Position } from '../../models/position';
import { AnimationsCreator } from '../animations/animations-creator';
import { DirectionItem } from '../../../shared/custom-types/direction-item';

/**
 * It represents the parent arcade sprite
 */
export abstract class BaseArcadeSprite extends Phaser.Physics.Arcade.Sprite {
    //#region fields
    private _speed: number;
    private _currentDirection = new DirectionItem();
    //#endregion

    constructor(protected _scene: BaseLevelScene, 
        protected _name: string, 
        protected _position: Position, 
        protected _properties: PropertiesSetting,
        protected _animationsCreator: AnimationsCreator) {
        super(_scene, _position.x, _position.y, _properties.texture);        

        _scene.addSprite(this, this._properties.group);
        this.initialize(_properties);
    }

    //#region public methods
    update() {
        let isDestroy = false;        
        
        if (this.x > window.innerWidth + 80) {
            this.visible = false;
            this.destroy();
            isDestroy = true;
        }

        if (! isDestroy) {
            this.setVelocityX(this.speed);
        }
    }
    //#endregion

    //#region internal methods
    /**
     * Initialize all : speed, depth, scale, ...
     * Could be overrided
     */
    protected initialize(properties: PropertiesSetting) {
        this.name = this._name;

        if (properties.depth) {
            this.setDepth(properties.depth);
        }

        if (properties.scale) {
            this.setScale(properties.scale.x, properties.scale.y);
        }

        if (typeof properties.visible !== "undefined") {
            this.setVisible(properties.visible);
        }

        this.defineSpeed();
    }

    protected defineSpeed() {
        this.speed = Phaser.Math.Between(10, 100);
    }
    //#endregion

    //#region properties
    /**
     * Speed of the sprite
     */
    protected get speed(): number {
        return this._speed;
    }

    /**
     * Sets the speed of the sprite
     */
    protected set speed(value: number) {
        this._speed = value;
    }

    /**
     * Gets the current direction of the sprite
     * Default values are false
     */
    protected get currentDirection() {
        return this._currentDirection;
    }
    //#endregion
}