import { BaseLevelScene } from '../scenes/base-level-scene';
import { PropertiesSetting } from '../models/properties-setting';
import { Position } from '../models/position';

// https://github.com/yoeleven/phaser3-gameobject-video/blob/master/component/video.js
/**
 * Sprite to display one video
 */
export class VideoSprite extends Phaser.GameObjects.Video {
    //#region fields
    private _loaded = false;
    private _loop = false;
    private _create
    //#endregion

    constructor(private _scene: BaseLevelScene,
        private _name: string,
        private _position: Position,
        private _properties: PropertiesSetting) {
        
        super(_scene, _position.x, 
                      _position.y, 
                      _name);

            this.initialize(); 
        }      
                    
    //#region internal methods
    private initialize() {       
        this._scene.add.existing(this);
    
    

        this.play(false);
    }

    private getCurrentAssetVideo(key: string) {
        return this._scene.getVideoByKey(key);
    }
    //#endregion
    
    //#region properties    
    /**
     * Defines if video would be loaded
     */
    public get loaded() : boolean {
        return this._loaded;
    }

    /**
     * Defines if video would be loaded
     */
    public set loaded(value : boolean) {
        this._loaded = value;
    }
    
    /**
     * Defines if video is looping
     */
    public set loop(value : boolean) {
        this._loop = value;
    }
    
    /**
     * Defines if video is looping
     */
    public get loop() : boolean {
        return this._loop; 
    }
    //#endregion
}