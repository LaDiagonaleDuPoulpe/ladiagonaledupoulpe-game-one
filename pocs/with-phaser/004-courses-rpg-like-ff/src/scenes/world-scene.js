import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';

/**
 * Loading worl tilemap scene
 */
class WorldScene extends JSonLevelScene {
    constructor() {
        super('WorldScene');
    }

    //#region public methods
    create() {
        this.map = this.add.tilemap(this.levelData.map.key);

        this.prepareTileSets();
        this.prepareLayers();
    }
    //#endregion
    
    //#region internal methods
    prepareLayers() {
        this.layers = {};
        this.map.layers.forEach((layer, index) => {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);
        });
    }

    prepareTileSets() {
        this.tilesets = {};
        this.map.tilesets.forEach((tileSet, index) => {
            const tileSetContent = this.levelData.map.tilesets[index];
            const mapTileset = this.map.addTilesetImage(tileSet.name, 
                                                        tileSetContent);
        
            this.tilesets[tileSetContent] = mapTileset;
            }, this);
    }

    setPrefabs() {
        this.prefabsClasses = {
            player: Prefab.prototype.constructor,
            text: TextPrefab.prototype.constructor
        };
    }
    //#endregion
}

export default WorldScene;