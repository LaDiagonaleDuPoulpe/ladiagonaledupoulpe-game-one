import JSonLevelScene from './json-level-scene';
import Prefab from '../prefabs/prefab';
import TextPrefab from '../prefabs/text-prefab';
import Player from '../prefabs/world/player';
import Door from '../prefabs/world/door';
import NPC from '../prefabs/world/npc';
import EnemySpawner from '../prefabs/world/enemy-spawner';
import Equipment from '../prefabs/world/equipment';

/**
* Loading world tilemap scene
*/
class WorldScene extends JSonLevelScene {
    constructor() {
        super('WorldScene');

        this.defineTextStyle();
    }

    //#region public methods
    putGameInPause() {
        this.scene.start('BootScene', {
            scene: 'pause',
            extraParameters: {
                previousLevel: this.levelData.level
            }
        })
    }

    /**
     * Creates the world (loads map, tilesets, layers, ...)
     */
    create() {
        this.map = this.add.tilemap(this.levelData.map.key);

        this.prepareTileSets();
        this.prepareLayers();

        super.create();

        this.prepareObjects();
    }

    /**
     * Preloads data messages
     */
    preload() {
        this.loadMessages();
        this.loadEnemyEncounters();
    }

    endTalk() {
        this.currentMessageBox.destroy();
        this.userInput.setInput(this.userInputs.townUserInput);
    }
    //#endregion

    //#region internal methods
    defineTextStyle() {
        this.TEXT_STYLE = {
            font: '14px Kells',
            fill: "#ffffff"
        };
    }

    loadEnemyEncounters() {
        for (let key in this.levelData.enemyEncounters) {
            this.load.json(key, this.levelData.enemyEncounters[key]);
        }
    }

    loadMessages() {
        for (const key in this.levelData.npcMessages) {
            this.load.text(key, this.levelData.npcMessages[key]);
        }
    }

    prepareObjects() {
        this.map.objects.forEach((layer) => {
            layer.objects.forEach(this.createOneOject, this);
        });
    }

    createOneOject(object) {
        let position = {
            x: object.x + (object.width / 2),
            y: object.y + (object.height / 2)
        };

        if (this.prefabsClasses.hasOwnProperty(object.type)) {
            let prefab = new this.prefabsClasses[object.type](this, object.name, position, object.properties);
        }
    }

    prepareLayers() {
        this.layers = {};
        this.map.layers.forEach((layer, index) => {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);

            if (layer.properties.collision) {
                this.map.setCollisionByExclusion([-1], true, layer.name);
            }
        });
    }

    prepareTileSets() {
        this.tilesets = {};
        this.map.tilesets.forEach((tileSet, index) => {
            const tileSetContent = this.levelData.map.tilesets[index];
            const mapTileset = this.map.addTilesetImage(tileSet.name, tileSetContent);
            this.tilesets[tileSetContent] = mapTileset;
        }, this);
    }

    setPrefabs() {
        this.prefabsClasses = {
            player: Player.prototype.constructor,
            door: Door.prototype.constructor,
            npc: NPC.prototype.constructor,
            equipment: Equipment.prototype.constructor,
            enemySpawner: EnemySpawner.prototype.constructor
        };
    }
    //#endregion
}

export default WorldScene;