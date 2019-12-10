import { SpriteCreator } from './sprite-creator';
import { PrefabType } from '../../../../shared/enums/prefab-type';

/**
 * Allows you to create waves in one scene
 */
export class WavesCreator extends SpriteCreator {
    //#region Internal methods
    protected isPermittedToCreate(): boolean {
        return true;
    }
    protected configureSprite(sprite: Phaser.Types.Tilemaps.TiledObject): void {
        sprite.x = Phaser.Math.Between(0, 450);
        
        sprite.y = Phaser.Math.Between(500, 1000); 
    }
    //#endregion
    
    //#region Properties
    public get spriteType(): PrefabType {
        return PrefabType.wave;
    }
    //#endregion
}