import { BaseMapLevelScene } from '../../../scenes/base-map-level.scene';
import { ObjectCreator } from './object-creator';

/**
 * Base class of creator of sprites, like units
 */
export abstract class SpriteCreator<T> {
    //#region Public methods
    /**
     * Creates new sprite object
     * @param scene Scene to add new sprite
     * @param objectCreator Dedicated class to create object
     * @param saveInScene Function to save in scene
     */
    public createNewOne(scene: BaseMapLevelScene, objectCreator: ObjectCreator, saveInScene: Function) {
        if (this.isPermittedToCreate()) {

        }
    }
    //#endregion

    //#region Internal methods
    /**
     * Allows you to define if during one frame we can create a new sprite
     */
    protected abstract isPermittedToCreate(): boolean;

    /**
     * Configures sprite : define position, frame rate, ...
     */
    protected abstract configureSprite(sprite: Phaser.GameObjects.Sprite): void;
    //#endregion

    ///#region Properties
    public abstract get SpriteType(): T;
    //#endregion
}