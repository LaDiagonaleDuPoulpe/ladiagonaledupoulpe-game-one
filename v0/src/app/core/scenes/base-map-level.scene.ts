import { BaseLevelScene } from './base-level.scene';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { Dictionary } from '../../shared/custom-types/dictionary';

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
        if (this.levelConfig.data.map) {
            this._map = this.add.tilemap(this.levelConfig.data.map.key);
            this.prepareTileSets();
            this.prepareLayers();            
        }
        super.create();
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
        this._map.layers.forEach((layer, index) => {
            const currentTileSetKey = (<any> layer.properties[index]).value;
            const staticLayer = this._map.createStaticLayer(layer.name, this._tilesets[currentTileSetKey]);
            this._layers[layer.name] = staticLayer;
            
            
        }, this);
    }
    //#endregion
}