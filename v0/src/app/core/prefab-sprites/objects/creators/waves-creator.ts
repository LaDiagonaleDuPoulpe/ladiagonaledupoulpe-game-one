import { SpriteCreator } from './sprite-creator';
import { PrefabType } from '../../../../shared/enums/prefab-type';
/**
 * Allows you to create waves in one scene
 */
export class WavesCreator extends SpriteCreator {
    //#region Internal methods
    protected isPermittedToCreate(): boolean {
        throw new Error("Method not implemented.");
    }
    protected configureSprite(sprite: Phaser.Types.Tilemaps.TiledObject): void {
        throw new Error("Method not implemented.");
    }
    //#endregion
    
    //#region Properties
    public get spriteType(): PrefabType {
        return PrefabType.wave;
    }
    //#endregion
}