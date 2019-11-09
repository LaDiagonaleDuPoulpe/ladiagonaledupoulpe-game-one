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
    public _map: Phaser.Tilemaps.Tilemap;
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

    /**
     * Creates one object from a sprite object 
     * @param spriteObject Sprite object from objects list
     */
    protected createObject(spriteObject: Phaser.Types.Tilemaps.TiledObject) {
        if (spriteObject.visible) {
            this.createObjectWithDetails(spriteObject.name, spriteObject.type,
                                        spriteObject.x, spriteObject.y,
                                        this.getPropertyValue('depth', spriteObject),
                                        this.getPropertyValue('texture', spriteObject), 
                                        this.getPropertyValue('group', spriteObject),
                                        this.getPropertyValue('frame', spriteObject));
        }
    }

    /**
     * Creates one object from all details
     */
    protected createObjectWithDetails(name: string, type: string, x: number, y: number, depth: number, 
                                      texture: string, group: string, 
                                      frame?: string) {
            const objectPosition = {
                x: x,
                y: y
            };

            const properties = {
                depth: depth,
                texture: texture,
                frame: frame,
                group: group
            }

            const sprite = PrefabSpriteFactory.create(<PrefabType> type, this, name, 
                                                      objectPosition, <PropertiesSetting> properties);
            this.saveSpriteInScene(sprite, properties.group, name);
    }

    private getPropertyValue(key: string, spriteObject: Phaser.Types.Tilemaps.TiledObject): any {
        const propertiesArray = <Array<any>> spriteObject.properties;
        const item = propertiesArray.find(item => item.name === key);

        return item ? item.value : null;
    }
    //#endregion
}