import { BaseModalPlugin } from './base-modal.plugin';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { Prefab } from '../models/prefabs/prefab';
import { Dictionary } from '../../shared/custom-types/dictionary';

/** Parent modal plugin for all modal with displayed and animated prefab  */
export abstract class BaseModalWithPrefabPlugin extends BaseModalPlugin { 
    //#region Fields
    private _listOfDisplayingSprites: Dictionary<Phaser.GameObjects.Sprite> = {};
    private _displayingPersonSprite: Phaser.GameObjects.Sprite;
    //#endregion
    
    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }

    //#region Public methods
    public toggleWindow(visibility: boolean) {
        super.toggleWindow(visibility);

        this.setVisibilityOfCurrentPrefabBox(visibility);
    }
    //#endregion

    //#region Internal methods
    /**
     * Allows you to create the box to display the prefab of the current people, player
     * @param prefab Json prefab config to give to scene to create the prefab to display and animate
     * @param x 
     * @param y 
     * @param rectWidth Width of the box to display the prefab
     * @param rectHeight Height of the box to display the prefab
     */
    protected createPeopleBox(prefab: Prefab, x: number, y: number, rectWidth: number, rectHeight: number) {     
        if (prefab) {
            this.setPrefabToDisplay(prefab);
            
            this.setFixed(this._displayingPersonSprite);            
            this._displayingPersonSprite.setPosition(x + 10 + this.configuration.padding * 2, y + rectHeight / 2 );
        }
    }

    private setPrefabToDisplay(prefab: Prefab) {
        this._displayingPersonSprite = this._listOfDisplayingSprites[prefab.key];

        if (! this._displayingPersonSprite) {
            this.hideCurrentPrefabSprite(); 

            this._displayingPersonSprite = this.scene.createSpriteByPrefabObject(<Prefab> prefab);
            this._listOfDisplayingSprites[prefab.key] = this._displayingPersonSprite;
        }
    }

    /**
     * Allows you to hide the current prefab sprite
     * This prefab represents the people in the box
     */
    protected hideCurrentPrefabSprite() {
        this.setVisibilityOfCurrentPrefabBox(false);
    }

    /**
     * Allows you to hide or show the current prefab sprite
     * This prefab represents the people in the box
     */
    protected setVisibilityOfCurrentPrefabBox(visibility: boolean) {
        if (this._displayingPersonSprite) {
            this._displayingPersonSprite.setVisible(visibility);
        }
    }
    //#endregion

    //#region Properties
    protected get currentPrefab(): Phaser.GameObjects.Sprite {
        return this._displayingPersonSprite;
    }
    //#endregion
}