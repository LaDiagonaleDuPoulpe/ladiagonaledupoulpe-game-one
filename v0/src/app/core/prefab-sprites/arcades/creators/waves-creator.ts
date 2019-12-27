import { SpriteCreator } from './sprite-creator';
import { PrefabType } from '../../../../shared/enums/prefab-type';
import { BaseUnit } from '../../units/base.unit';

/**
 * Allows you to create waves in one scene
 */
export class WavesCreator extends SpriteCreator {
    //#region Fields
    private _isAllowToCreate = true;
    private _moduloList = [2, 5, 10, 15, 30];
    private _currentModulo = 0;
    private _minY = 500;
    private _maxY = 1000;
    //#endregion

    //#region Internal methods
    protected isPermittedToCreate(): boolean {
        this._currentModulo = Phaser.Math.Between(0, 4);

        return Phaser.Math.Between(0, 100) % this._moduloList[this._currentModulo] === 0;
    }
    protected configureSprite(sprite: Phaser.Types.Tilemaps.TiledObject): void {
        sprite.x = Phaser.Math.Between(0, 1800);
        sprite.y = Phaser.Math.Between(this._minY, this._maxY);
        
        if (sprite instanceof BaseUnit) {
            let scale = 2;

            scale = sprite.y / 600;

            (<BaseUnit> sprite).setScale(scale, scale);
        }
    }
    //#endregion
    
    //#region Properties
    public get spriteType(): PrefabType {
        return PrefabType.wave;
    }
    //#endregion
}