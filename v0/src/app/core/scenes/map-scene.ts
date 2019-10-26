import { injectable } from "tsyringe";
import { Dictionary } from '../../shared/custom-types/dictionary';
import { DefaultLogger } from "../../shared/services/default-logger";
import { LevelManageService } from "../../shared/services/level-manager.service";
import { BaseLevelScene } from './base-level-scene';

/**
* Scene with map loading, (tile json loaded)
*/
@injectable()
export class MapScene extends BaseLevelScene {
    //#region fields
    private _map: Phaser.Tilemaps.Tilemap;
    private _tilesets: Dictionary<Phaser.Tilemaps.Tileset> = {};
    private _layers: Dictionary<Phaser.Tilemaps.StaticTilemapLayer> = {}
    //#endregion

    constructor(protected _logger: DefaultLogger,
        private _levelManageService: LevelManageService) {
            super(MapScene.name, _logger, _levelManageService);
        }
        
        //#region public methods
        preload() {
            
        }
        
        create() {
            this._map = this.add.tilemap(this.levelConfig.data.map.key);
            this.prepareTileSets();
            this.prepareLayers();

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