import { BaseMapLevelScene } from "../scenes/base-map-level.scene";
import { Position } from "../models/position";

/** Parent class to create a box inside the game, as a scene plugin  */
export abstract class BaseDisplayingDataBoxPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _graphicObject: Phaser.GameObjects.Graphics;
    //#endregion
    
    constructor(protected _scene: BaseMapLevelScene, 
                protected _pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, _pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    //#endregion

    //#region Internal methods
    /** 
     * Allows you to create window. Overrides it to create the window
     * Here, we initialize the graphic object of the modal box
     */
    protected createBox() {
        this._graphicObject = this.prepareOneGraphicsObject();
    } 

    protected prepareOneGraphicsObject(): Phaser.GameObjects.Graphics {
        const object = this.scene.add.graphics();

        this.setFixed(object);        

        return object;
    }

    /** 
     * Allows you to create a 'box' with rectangle style
     *  @param position Defines the x, y and size iof the box
     */
    protected createBoxAsRectangle(graphicObject: Phaser.GameObjects.Graphics, 
                                position: Position,
                                borderThickness: number,
                                borderColor: number) {
        graphicObject.lineStyle(borderThickness, borderColor);
        graphicObject.strokeRect(position.x, position.y, position.width, position.height);
    }

    /**
     * Creates the inside box, where we can find data information
     * @param x Top X position
     * @param y Top Y position
     * @param rectWidth Width of the inside box
     * @param rectHeight Height of the inside box
     */
    protected abstract createInnerBox(x: number, y: number, rectWidth: number, rectHeight: number);

    /** Sets modal box to a fixed mode (can't move, and before all game objects) */
    protected setFixed(object: Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image, 
                       depth: number = 100) {
        object.setScrollFactor(0);
        object.setDepth(depth);
    }

    /** Gets the width of the game, based on system game config */
    protected getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    /** Gets the height of the game, based on system game config */
    protected getGameHeight() {
        return this.scene.sys.game.config.height;
    }
    //#endregion

    //#region Properties
    /** Scene where the modal box is display */
    protected get scene(): BaseMapLevelScene {
        return this._scene;
    }

    /** Current graphic object that represents the modal box */
    protected get graphicObject(): Phaser.GameObjects.Graphics {
        return this._graphicObject;
    }
    //#endregion
}