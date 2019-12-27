import { Dictionary } from '../../shared/custom-types/dictionary';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseLevelScene } from './base-level.scene';
import { PrefabType } from '../../shared/enums/prefab-type';

/**
* Base map level scene : it's the mother class to represent all map scene
*/
export abstract class BaseMapLevelScene extends BaseLevelScene {
    //#region fields
    public _map: Phaser.Tilemaps.Tilemap;
    private _tilesets: Dictionary<Phaser.Tilemaps.Tileset> = {};
    private _layers: Dictionary<Phaser.Tilemaps.StaticTilemapLayer> = {}
    //#endregion
    
    constructor(key: string, 
                protected _logger: DefaultLogger, 
                protected _levelManager: LevelManageService,
                protected _objectCreator: ObjectCreator) {
        super(key, _logger, _levelManager, _objectCreator);
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

    /**
     * Gets one sprite object by its type 
     */
    getOneObject(type: PrefabType): Phaser.Types.Tilemaps.TiledObject {
        let item: Phaser.Types.Tilemaps.TiledObject = null;

        if (this._map.objects.length) {
            item = this._map.objects[0].objects.find(item => item.type === type)
        }

        return item;
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
                this._objectCreator.createObject(spriteObject, this, this.saveSpriteInScene.bind(this));
            }, this);
        }, this);
    }
    //#endregion
}