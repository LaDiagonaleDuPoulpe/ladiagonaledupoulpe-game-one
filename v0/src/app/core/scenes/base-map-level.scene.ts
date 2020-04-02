import { Dictionary } from '../../shared/custom-types/dictionary';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { BaseLevelScene } from './base-level.scene';
import { PrefabType } from '../../shared/enums/prefab-type';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { LightManager } from '../plugins/light-manager';
import { PrefabSprite } from '../prefab-sprites/prefab.sprite';
import { PrefabSpriteFactory } from '../prefab-sprites/prefab-sprite-factory';
import { Prefab } from '../models/prefabs/prefab';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

/**
* Base map level scene : it's the mother class to represent all map scene
*/
export abstract class BaseMapLevelScene extends BaseLevelScene {
    //#region fields
    public _map: Phaser.Tilemaps.Tilemap;
    private _tilesets: Dictionary<Phaser.Tilemaps.Tileset> = {};
    private _layers: Dictionary<Phaser.Tilemaps.StaticTilemapLayer> = {};
    //#endregion
    
    constructor(key: string, 
                protected _logger: DefaultLogger, 
                protected _levelManager: LevelManageService,
                protected _colliderManagerService: ColliderManagerService,
                protected _objectCreator: ObjectCreator,
                protected _animationsCreator: AnimationsCreator,
                protected _lightManager: LightManager,
                protected _gameDataManager: GameManagerService,
                protected _gameDataLoaderManager: GameDataLoaderService) {
        super(key, _logger, _levelManager, _colliderManagerService, _objectCreator, 
              _animationsCreator, _lightManager, _gameDataManager, _gameDataLoaderManager);
    }
    
    //#region public methods
    preload() {
        
    }
    
    create() {        
        if (this.levelConfig.data.map) {
            this._map = this.add.tilemap(this.levelConfig.data.map.key);
            this.prepareTileSets();
            this.prepareLayers();     
            this.prepareObjects();       
        }        
        super.create();
    }

    /**
     * Gets one sprite object by its type 
     */
    getOneObject(type: PrefabType): Phaser.Types.Tilemaps.TiledObject {
        let item: Phaser.Types.Tilemaps.TiledObject = null;

        if (this._map.objects && this._map.objects.length) {
            item = this._map.objects[0].objects.find(item => item.type === type)
        }

        return item;
    }

    /**
     * Applys collision detection from the sprite to player groups
     * @param sprite Sprites that detects collision
     */
    applyCollisionDetectionToPlayer(sprite: Phaser.GameObjects.Sprite) {
        this.physics.add.collider(sprite, this.physicalGroups.players, this.activatePlayerCollisions.bind(this), null, this);
    }
    
    /**
     * Applys buildings collision detection to the sprite
     * @param sprite Sprites that detects collision
     */
    applyBuildingsCollisionDetection(sprite: Phaser.GameObjects.Sprite) {
        this.physics.add.collider(sprite, this._layers.buildings, null, null, this);
    }

    /**
     * Creates sprite thanks to prefab from json file
     * @param prefab Prefab to get properties to create sprite
     */
    createSpriteByPrefabObject(prefab: Prefab): Phaser.GameObjects.Sprite {
        let sprite = null;

        if (prefab) {
            sprite = PrefabSpriteFactory.create(prefab.type, this, prefab.key, prefab.position, prefab.properties, this._animationsCreator);
        }

        return sprite;
    }
    //#endregion
    
    //#region internal methods
    private prepareTileSets() {
        if (this._map.tilesets && Array.isArray(this._map.tilesets)) {
            this._map.tilesets.forEach((tileset, index) => {
                const tilesetContent = this.levelConfig.data.map.tilesets[index];
                const mapTileset = this._map.addTilesetImage(tileset.name, tilesetContent);
                
                this._tilesets[tilesetContent] = mapTileset;
                
            }, this);
        }
    }
    
    private prepareLayers() {
        let i = 1;
        
        if (this._map.layers && Array.isArray(this._map.layers)) {
            this._map.layers.forEach((layer, index) => {
                const properties = (<Array<any>> layer.properties);
                const property = properties.find(item => item.name === 'tileset');
    
                if (property && layer.visible) {
                    const currentTileSetKey = property.value;
                    const staticLayer = this._map.createStaticLayer(layer.name, this._tilesets[currentTileSetKey]);
    
                    this._layers[layer.name] = staticLayer;
    
                    const collisionProperty = properties.find(item => item.name === 'collision');
                    if (collisionProperty && <boolean>(collisionProperty.value)) {
                        this._map.setCollisionByExclusion([-1], true, true, layer.name);
                    }
                }
                
            }, this);
        }
    }

    private prepareObjects() {
        if (this._map.objects && Array.isArray(this._map.objects)) {
            this._map.objects.forEach(object => {
    
                object.objects.forEach(spriteObject => {
                    this._objectCreator.createObject(spriteObject, this, this.saveSpriteInScene.bind(this));
                }, this);
            }, this);
        }
    }

    private activatePlayerCollisions(transmitter: Phaser.GameObjects.Sprite, receiver: Phaser.GameObjects.Sprite) {
        this.executeColliderAction(transmitter, receiver);
    }
    //#endregion
}