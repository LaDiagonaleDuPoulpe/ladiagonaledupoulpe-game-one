import { Dictionary } from '../../shared/custom-types/dictionary';
import { DefaultLogger } from '../../shared/services/default-logger';
import { LevelManageService } from '../../shared/services/level-manager.service';
import { ObjectCreator } from '../prefab-sprites/arcades/creators/object-creator';
import { PrefabSpriteFactory } from '../prefab-sprites/prefab-sprite-factory';
import { BaseScene } from './base.scene';
import { AnimationsCreator } from '../prefab-sprites/animations/animations-creator';
import { LightManager } from '../plugins/light-manager';
import { EventType } from '../models/dialog-modal/event-type';
import { ColliderManagerService } from '../../shared/services/collider-manager.service';
import { LevelConfig } from '../models/levels/level-config';
import { GameManagerService } from '../../shared/services/game-manager.service';
import { CustomPlayerEventType } from '../../shared/enums/custom-player-events-type';
import { OctopusSprite } from '../prefab-sprites/arcades/octopus.sprite';
import { GameDataLoaderService } from '../../shared/services/game-data-loader.service';

/**
* Base level scene : abstract class of all active map scenes
* Data are incoming from json file, loading in client cache
*/
export abstract class BaseLevelScene extends BaseScene {
    //#region fields    
    private _keyListeners = ['down', 'up'];
    
    private _physicalGroups: Dictionary<Phaser.Physics.Arcade.Group> = {};
    private _prefabSprites: Dictionary<Phaser.GameObjects.GameObject> = {};

    private _spritePlayers: Phaser.GameObjects.GameObject[] = [];
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
            super(key, _logger, _levelManager, _gameDataManager, _gameDataLoaderManager);
        }
        
        //#region public methods
        create() {
            this.createCollisionGroups();
            this.createAllPrefabSprites();
            this.createAllDataInStage();
            this.prepareMessageBoxContent();
        }
        
        update() {
            this.updateAllPrefabs();
        }

        init(config: LevelConfig) {
            super.init(config);

            if (config.data.colliderActions) {
                this._colliderManagerService.init(this, config.data.colliderActions);
            }
            this.defineEventsListeners();
        }
        
        /**
        * Applys collision detection from the sprite to player groups
        * @param sprite Sprites that detects collision
        */
        abstract applyCollisionDetectionToPlayer(sprite: Phaser.GameObjects.Sprite);
        
        /**
        * Adds buildings detection to an sprite
        */
        abstract applyBuildingsCollisionDetection(sprite: Phaser.GameObjects.Sprite);
        
        /**
        * Adds a sprite in the scene
        */
        addSprite(sprite: Phaser.GameObjects.Sprite, groupKey: string) {
            this.add.existing(sprite);
            if (groupKey && this._physicalGroups[groupKey]) {
                this._physicalGroups[groupKey].add(sprite);
            }
        }
        
        /**
        * Attach an action from event
        * @param item Event key
        * @param callback Action to launch
        */
        attachActionToKeyboardEvent(item: string, callback: Function) {
            const event = item.toLowerCase();
            this.input.keyboard.on(event, callback, this);
        }
        
        /**
        * Removes all event listeners 
        * @param item event key as a string
        */
        removeAllKeyboardListener(item: string) {
            const event = item.toLowerCase();
            this.input.keyboard.removeAllListeners(event);
        }
        
        /**
        * Updates all child prefabs
        */
        updateAllPrefabs() {
            for (const key in this.prefabSprites) {
                if (this.prefabSprites.hasOwnProperty(key)) {
                    const sprite = this.prefabSprites[key];
                    sprite.update();
                }
            }
        }
        
        /**
        * Get video asset by key string
        * @param key string to find asset
        */
        getVideoByKey(key: string) {
            const videoAsset = this.configData.assets.videos.find((video) => video.key === key, this);
            
            if (! videoAsset) {
                throw new Error(`Video with key ${key} is missing`);
            }
            
            return videoAsset;
        }
        //#endregion
        
        //#region internal methods 
        private defineEventsListeners() {
            this.events.on(CustomPlayerEventType.diying, this.launchDyingAnimation, this);
            this.events.on(CustomPlayerEventType.endOfDying, this.launchEndOfDying, this);
            this.events.on(CustomPlayerEventType.died, this.launchDiedScene, this);
            this.events.on(CustomPlayerEventType.reborn, this.launchRebornPlayer, this);
            this.events.on(CustomPlayerEventType.endOfReborn, this.launchEndOfRebornPlayer, this);
        }

        /** Launches dying scene, and reactive the last scene if player can do it */
        protected launchDyingAnimation() {
            const octopus = <OctopusSprite> this.spritePlayers[0];
            octopus.die();
        }

        /** Launches end of diying event : to check if player can reborn */
        protected launchEndOfDying() {
            this.gameDataManager.tryToReborn();
        }

        /** Launches end of the game */
        protected launchDiedScene() {
            const levelKey = this._levelManager.setEndGameStep();
            this.goToNextScene(levelKey);
        }

        /** Launches ability to reborn of the player */
        protected launchRebornPlayer() {
            const octopus = <OctopusSprite> this.spritePlayers[0];
            octopus.reborn();
        }

        /** Launches the reinitialization of player data */
        protected launchEndOfRebornPlayer() {
            const octopus = <OctopusSprite> this.spritePlayers[0];
            
            this.gameDataManager.reinitData();
            octopus.reinit();
            this.displayReinitHealthData();
        }

        private createAllDataInStage() {
            if (this.levelConfig.data.stageItems && Array.isArray(this.levelConfig.data.stageItems)) {
                this.levelConfig.data.stageItems.forEach(item => {
                    this._lightManager.create(this, item);
                }, this);
            }
        }
        
        private createCollisionGroups() {
            if (this.levelConfig.data.groups && Array.isArray(this.levelConfig.data.groups)) {
                this.levelConfig.data.groups.forEach((groupName) => {
                    this.physicalGroups[groupName] = this.physics.add.group();
                }, this);
            }
        }
        
        private createAllPrefabSprites() {
            if (this.levelConfig.data.prefabs && Array.isArray(this.levelConfig.data.prefabs)) {
                this.levelConfig.data.prefabs.forEach((prefab) => {
                    const sprite = PrefabSpriteFactory.create(prefab.type, this, prefab.key, prefab.position, prefab.properties, this._animationsCreator);
                    this.saveSpriteInScene(sprite, prefab.properties.group, prefab.key);
                }, this);
            }
        }
        
        /**
        * Adds the sprite in the scene, and group collision
        * @param sprite Creating sprite to add in scene
        * @param group Group collision name
        * @param key Key as name
        */
        protected saveSpriteInScene(sprite, group: string, key: string) {
            if (sprite) {
                this.prefabSprites[key] = sprite;             
            }
        }
        
        /**
        * Sets all messages to the message box
        * Manage events switch to load messages
        * Allows you to overload it
        */
        protected prepareMessageBoxContent() {
            this._logger.log('prepareMessageBoxContent', this.levelConfig.data.messagesContent);
            this.messageBox.modalContent = this.levelConfig.data.messagesContent;
            
            
            // TODO: 11/01/2020, you have to manage events trigger to display all message
            this.messageBox.show();
        }

        protected executeColliderAction(transmitter: Phaser.GameObjects.Sprite, receiver: Phaser.GameObjects.Sprite) {
            this._colliderManagerService.execute(transmitter, receiver, this.gameDataManager);
        }
        //#endregion
        
        //#region properties
        /**
        * Gets groups list
        */
        public get physicalGroups(): Dictionary<Phaser.Physics.Arcade.Group> {
            return this._physicalGroups;
        }
        
        /**
        * Gets prefab sprite list
        */
        public get prefabSprites(): Dictionary<Phaser.GameObjects.GameObject> {
            return this._prefabSprites;
        }
        
        /**
        * Gets list of sprite as player in the game
        */
        public get spritePlayers(): Phaser.GameObjects.GameObject[] {
            if (this._spritePlayers.findIndex(item => item.name == this.prefabSprites["player"].name) === -1) {
                this._spritePlayers.push(this.prefabSprites["player"]);
            }
            
            return this._spritePlayers;
        }
        //#endregion
}