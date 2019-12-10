import { BaseMapLevelScene } from '../../../scenes/base-map-level.scene';
import { ObjectCreator } from './object-creator';
import { PrefabType } from '../../../../shared/enums/prefab-type';

/**
 * Base class of creator of sprites, like units
 */
export abstract class SpriteCreator {
    //#region Public methods
    /**
     * Creates new sprite object
     * @param scene Scene to add new sprite
     * @param objectCreator Dedicated class to create object
     * @param saveInScene Function to save in scene
     */
    public createNewOne(scene: BaseMapLevelScene, objectCreator: ObjectCreator, saveInScene: Function) {
        if (this.isPermittedToCreate()) {
            let sprite = null;
            
            const prefab = scene.getOnePrefabByType(this.spriteType);
            if (prefab) {
                const config = {
                    type: this.spriteType,
                    name: prefab.key,
                    scene: scene,
                    x: prefab.position.x,
                    y: prefab.position.y,
                    depth: prefab.properties.depth,
                    texture: prefab.properties.texture,
                    group: prefab.properties.group,
                    visible: true
                };
                sprite = objectCreator.createObjectWithDetails(config, saveInScene);
            }

            if (sprite != null) {
                this.configureSprite(sprite);
            }
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
    protected abstract configureSprite(sprite: Phaser.Types.Tilemaps.TiledObject): void;
    //#endregion

    ///#region Properties
    public abstract get spriteType(): PrefabType;
    //#endregion
}