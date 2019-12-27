import { injectable } from 'tsyringe';

import { CloudSprite } from '../cloud.sprite';
import { PrefabType } from '../../../../shared/enums/prefab-type';
import { BaseLevelScene } from '../../../scenes/base-level.scene';
import { ObjectCreator } from './object-creator';
import { BaseMapLevelScene } from '../../../scenes/base-map-level.scene';
import { SpriteCreator } from './sprite-creator';

/**
 * Allows you to create a list of cloud, and manage them
 */
@injectable()
export class CloudCreator extends SpriteCreator {
    //#region Internal methods
    protected isPermittedToCreate(): boolean {
        return Phaser.Math.Between(0, 100) % 35 === 0;
    }
    protected configureSprite(sprite: Phaser.Types.Tilemaps.TiledObject): void {
        sprite.x = -300;
        sprite.y = Phaser.Math.Between(0, 450); 
    }
    //#endregion
    
    //#region Properties
    public get spriteType(): PrefabType {
        return PrefabType.cloud;
    }
    //#endregion
}