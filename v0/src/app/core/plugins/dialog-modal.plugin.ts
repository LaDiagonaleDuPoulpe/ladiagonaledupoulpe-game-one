import { BaseLevelScene } from '../scenes/base-level.scene';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { PrefabSpriteFactory } from '../prefab-sprites/prefab-sprite-factory';
import { PrefabType } from '../../shared/enums/prefab-type';
import { Prefab } from '../models/prefab';
import { ModalText } from '../models/dialog-modal/modal-text';
import { ModalContent } from '../models/dialog-modal/modal-content';

/**
* Plugin to display a message box in current scene
*/
// https://phaser.io/examples/v3/view/plugins/scene-plugin-test-1
export class DialogModalPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _configuration: DialogModalConfiguration;
    private _graphicObject: Phaser.GameObjects.Graphics;
    private _closeButton: Phaser.GameObjects.Text;
    private _displayedMessage: Phaser.GameObjects.Text;
    private _nextPageButton: Phaser.GameObjects.Text;
    private _currentModalText: ModalText;
    private _modalContent: ModalContent;
    private _messageInArray: string[];
    private _eventCounter = 0;
    private _timedEvent: Phaser.Time.TimerEvent;
    private _displayingPersonSprite: Phaser.GameObjects.Sprite;
    //#endregion
    
    constructor(private _scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
        this._systems = this._scene.sys;
    }
    
    //#region Public methods
    boot() {
        super.boot();
    }
    
    /**
    * Initializes the message box on the bottom of the screen
    */
    init(config: DialogModalConfiguration) {
        this._configuration = config;
        
        if (config) {
            this.createWindow();
        }
    }
    
    /**
    * Show the message box
    */
    show() {
        if (this._modalContent && this._modalContent.messageList && this._modalContent.messageList.length > 0) {
            this.toggleWindow(true);
        }
    }
    
    /**
    * Hides the message box
    */
    hide() {
        this.toggleWindow(false);
    }
    //#endregion
    
    //#region Internal methods
    private toggleWindow(visibility: boolean) {
        this._graphicObject.setVisible(visibility);
        this._closeButton.setVisible(visibility);
        
        if (this._displayedMessage) {
            this._displayedMessage.setVisible(visibility);
        }
        
        if (this._displayingPersonSprite) {
            this._displayingPersonSprite.setVisible(visibility);
        }

        if (this._nextPageButton) {
            this._nextPageButton.setVisible(visibility);
        }
    }
    
    private createWindow() {
        const gameHeight = this.getGameHeight();
        const gameWidth = this.getGameWidth();
        const dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this._graphicObject = this.scene.add.graphics();
        
        this.setFixed(this._graphicObject);
        
        this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.createPeopleSpeakingBox(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        
        this.createCloseModalButton();
        
        this.createNextPageButton();

        this.hide();
    }
    
    private setFixed(object: Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite, depth: number = 100) {
        object.setScrollFactor(0);
        object.setDepth(depth);
    }
    
    private createNextPageButton() {
        this._nextPageButton = this.scene.make.text({
            x: 300,
            y: 1000,
            text: '>> Suivant',
            style: {
                font: this._configuration.closeButtonStyle.font,
                fill: this._configuration.closeButtonStyle.fill
            }
        });
        this._nextPageButton.setInteractive();
        this.setFixed(this._nextPageButton, 101);
    }

    private createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.fillStyle(this._configuration.windowColor);
        this._graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    
    private createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.lineStyle(this._configuration.borderThickness, this._configuration.borderColor);
        this._graphicObject.strokeRect(x, y, rectWidth, rectHeight);
    }
    
    private createPeopleSpeakingBox(x: number, y: number, rectWidth: number, rectHeight: number) {        
        x = x + this._configuration.padding + 10;
        y = y + this._configuration.padding + 10;
        
        const prefab = {
            type: PrefabType.animated,
            key: 'spikeOcotpus',
            playable: false,
            position: { x: x, y: y},
            properties: {
                texture: 'sparkLeftSpriteSheet',
                depth: 103,
                animations: [
                    {
                        key: 'idle',
                        frames: [
                            0,1,2,3,4,5,6,7,8,9,10,11,12,20,21,22
                        ],
                        fps: 5,
                        repeat: -1
                    }
                ]
            }
        }
        
        if (prefab) {
            this._displayingPersonSprite = this._scene.createSpriteByPrefabObject(<Prefab> prefab);
            this.setFixed(this._displayingPersonSprite);
            
            this._displayingPersonSprite.setPosition(x, y - this._configuration.padding + rectHeight / 2 );
        }
    }
    
    private getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    private getGameHeight() {
        return this.scene.sys.game.config.height;
    }
    
    private calculateWindowDimensions(width: string | number, height: string | number) {
        var x = this._configuration.padding;
        var y = +height - this._configuration.windowHeight - this._configuration.padding;
        var rectWidth = +width  - (this._configuration.padding * 2);
        var rectHeight = this._configuration.windowHeight;
        
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }

    private createTextAsButton(x: number, y: number, message: string, depth: number, callback: Function): Phaser.GameObjects.Text {
        const button = this.scene.make.text({
            x: x,
            y: y,
            text: message,
            style: {
                font: this._configuration.closeButtonStyle.font,
                fill: this._configuration.closeButtonStyle.fill
            }
        });
        
        this.setFixed(button, depth);
        
        button.setInteractive();
        
        button.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        button.on('pointerout', function () {
            this.clearTint();
        });
        button.on('pointerdown', function () {
            callback();
        });

        return button;
    }
    
    private createCloseModalButton() {
        var self = this;
        
        const x = +this.getGameWidth() - this._configuration.padding - 30;
        const y = +this.getGameHeight() - this._configuration.windowHeight - this._configuration.padding + 3;
        
        this._closeButton = this.createTextAsButton(x, y, '[X]', 101, self.hide.bind(self));
    }
    
    private setText(value: string) {
        if (this._displayedMessage) {
            this._displayedMessage.destroy();
        }
        
        const x = this._configuration.padding + this._displayingPersonSprite.width;
        const y = +this.getGameHeight() - this._configuration.windowHeight - this._configuration.padding + 10;
        
        this._displayedMessage = this.scene.make.text({
            x: x,
            y: y,
            text: value,
            style: {
                wordWrap: { width: +this.getGameWidth() - (this._configuration.padding * 2) - this._displayingPersonSprite.width }
            }
        });
        
        this.setFixed(this._displayedMessage, 101);
    }
    
    private animateText() {
        this._eventCounter++;
        this._displayedMessage.setText(this._displayedMessage.text + this._messageInArray[this._eventCounter - 1]);
        
        if (this._eventCounter === this._messageInArray.length) {
            this._timedEvent.remove();
        }
    }

    private displayOnText(value: ModalText) {
        this._eventCounter = 0;
        this._messageInArray = value.message.split('');
        
        if (this._timedEvent) {
            this._timedEvent.remove();
        }        
        
        const tempText = '';
        this.setText(tempText);
        
        this._timedEvent = this.scene.time.addEvent({
            delay: 300 - (this._configuration.dialogSpeed * 30),
            callback: this.animateText,
            callbackScope: this,
            loop: true
        });   
    }

    private setModalContentByText(...texts: ModalText[]) {
        this.modalContent = new ModalContent();
        this._modalContent.messageList = texts
    }

    
    //#endregion
    
    //#region Properties  
    /**
    * Text to be displayed (with animation in each character)
    */
    public set text(value: ModalText) {
        this.setModalContentByText(value);
        this.displayOnText(value); 
    }

    /**
     * List of text message to display in 
     */
    public set textList(values: ModalText[]) {
        this.setModalContentByText(...values);
    }

    /** Defines content with list of messages and ended callback */
    public set modalContent(value: ModalContent) {
        this._modalContent = value;
    }
    //#endregion
}

