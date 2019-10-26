import { BaseLevelScene } from '../scenes/base-level-scene';
import { PropertiesSetting } from '../models/properties-setting';
import { Position } from '../models/position';

// https://github.com/yoeleven/phaser3-gameobject-video/blob/master/component/video.js
/**
 * Sprite to display one video
 */
export class VideoSprite extends Phaser.GameObjects.Image {
    //#region fields
    private _loaded = false;
    private _loop = false;
    private _videoElement: HTMLVideoElement;
    //#endregion

    constructor(private _scene: BaseLevelScene,
        private _name: string,
        private _position: Position,
        private _properties: PropertiesSetting) {
        
        super(_scene, _position.x, 
                      _position.y, 
                      _properties.texture);

            this.initialize(); 
        }      
                    
    //#region internal methods
    private initialize() {        
        this.setVideoLoading();        
        this.setInteractive();

        this._scene.add.existing(this);
    }
    
    private setVideoLoading() {
        const texture = this._scene.textures.createCanvas(this._properties.texture, 800, 800);

        this._videoElement = document.createElement('video');

        this._videoElement.src = this.getCurrentAssetVideo(this._name).url;
        this._videoElement.muted = true;

        this.width = 800;
        this.height = 800;

        this._videoElement.width = 800;
        this._videoElement.height = 800;

        // this.setOrigin(0.5, 0.5);
		this.x= 0;
		this.y=0;
		// this.setScale(0.5, 0.5);

        const self = this;
        this._videoElement.addEventListener('loadeddata', () => {
            this._videoElement.play();
            //self.texture.drawImage(this, 0, 0);
            const text = self.texture;
            texture.context.drawImage(this._videoElement, 0, 0);
		    texture.refresh();
            self._loaded = true;
        });

        if (this._loop) {
            this._videoElement.addEventListener('ended', () => {
                this._videoElement.play();
            });
        }
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