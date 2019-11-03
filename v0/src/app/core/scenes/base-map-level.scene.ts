import { BaseLevelScene } from './base-level.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { Dictionary } from '../../shared/custom-types/dictionary';
import { PrefabSpriteFactory } from '../prefab-sprites/prefab-sprite-factory';
import { PropertiesSetting } from '../models/properties-setting';
import { PrefabType } from '../../shared/enums/prefab-type';
import { stat } from 'fs';

/**
* Base map level scene : it's the mother class to represent all map scene
*/
export abstract class BaseMapLevelScene extends BaseLevelScene {
    //#region fields
    private _map: Phaser.Tilemaps.Tilemap;
    private _tilesets: Dictionary<Phaser.Tilemaps.Tileset> = {};
    private _layers: Dictionary<Phaser.Tilemaps.StaticTilemapLayer> = {}
    //#endregion
    
    constructor(key: string, protected _logger: DefaultLogger, protected _levelManager: LevelManageService) {
        super(key, _logger, _levelManager);
    }
    
    //#region public methods
    preload() {
        
    }
    
    create() {
        super.create();

        if (this.levelConfig.data.map) {
            this._map = this.add.tilemap(this.levelConfig.data.map.key);
            this.prepareTileSets();
            this.prepareLayers();     
            this.prepareObjects();       
        }        
    }
    //#endregion
    
    //#region internal methods
    private prepareTileSets() {
        this._map.tilesets.forEach((tileset, index) => {
            const tilesetContent = this.levelConfig.data.map.tilesets[index];
            const mapTileset = this._map.addTilesetImage(tileset.name, tilesetContent);
            
            this._tilesets[tilesetContent] = mapTileset;
        }, this);
    }
    
    private prepareLayers() {
        let i = 1;
            
        this._map.layers.forEach((layer, index) => {
            const property = (<any> layer.properties[0]);

            if (property && layer.visible) {
                const currentTileSetKey = property.value;
                const staticLayer = this._map.createStaticLayer(layer.name, this._tilesets[currentTileSetKey]);
                // to be finished staticLayer.setDepth();
                //staticLayer.setDepth(i ++);

                this._layers[layer.name] = staticLayer;
            }

            this._logger.log('prepareLayer:properties', layer);
            
        }, this);
    }

    private prepareObjects() {
        this._logger.log('prepareObjects', this._map.objects);
        this._map.objects.forEach(object => {

            object.objects.forEach(spriteObject => {
                this.createObject(spriteObject);
            }, this);
        }, this);
    }

    private createObject(spriteObject: Phaser.Types.Tilemaps.TiledObject) {
        if (spriteObject.visible) {
            const objectPosition = {
                x: spriteObject.x,
                y: spriteObject.y
            };

            const properties = {
                depth: this.getPropertyValue('depth', spriteObject),
                texture: this.getPropertyValue('texture', spriteObject),
                frame: this.getPropertyValue('frame', spriteObject),
                group: this.getPropertyValue('group', spriteObject)
            }

            const sprite = PrefabSpriteFactory.create(<PrefabType> spriteObject.type, this, spriteObject.name, 
                                                      objectPosition, <PropertiesSetting> properties);
            this.saveSpriteInScene(sprite, properties.group, spriteObject.name);
        }
    }

    private getPropertyValue(key: string, spriteObject: Phaser.Types.Tilemaps.TiledObject): any {
        const propertiesArray = <Array<any>> spriteObject.properties;
        const item = propertiesArray.find(item => item.name === key);

        return item ? item.value : null;
    }
    //#endregion
}