import { BaseLevelScene } from '../scenes/base-level.scene';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal/dialog-modal-configuration';
import { PrefabSpriteFactory } from '../prefab-sprites/prefab-sprite-factory';
import { PrefabType } from '../../shared/enums/prefab-type';
import { Prefab } from '../models/prefab';
import { ModalText } from '../models/dialog-modal/modal-text';
import { ModalContent } from '../models/dialog-modal/modal-content';
import { Position } from '../models/position';
import { Dictionary } from '../../shared/custom-types/dictionary';

/**
* Plugin to display a message box in current scene
*/
// https://phaser.io/examples/v3/view/plugins/scene-plugin-test-1
// TODO: See if we can split this class in several small ones
export class DialogModalPlugin extends Phaser.Plugins.ScenePlugin {
    //#region Fields
    private _systems: Phaser.Scenes.Systems;
    private _configuration: DialogModalConfiguration;
    private _graphicObject: Phaser.GameObjects.Graphics;
    private _currentBoxDimensions: Position;
    private _closeButton: Phaser.GameObjects.Text;
    private _displayedMessage: Phaser.GameObjects.Text;
    private _nextPageButton: Phaser.GameObjects.Text;
    private _currentMessageTextToDisplayIndex = 0;
    private _currentModalText: ModalText;
    private _modalContent: ModalContent;
    private _messageInArray: string[];
    private _eventCounter = 0;
    private _timedEvent: Phaser.Time.TimerEvent;
    private _displayingPersonSprite: Phaser.GameObjects.Sprite;
    private _listOfDisplayingSprites: Dictionary<Phaser.GameObjects.Sprite> = {};
    private  _positionByDirectionList: Dictionary<Position>;
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
    * Be careful : if isMessagesDisplayed is set to true, 
    * you need to set message text list before calling this method
    */
    show(isMessagesDisplayed: boolean = true) {
        if (this._modalContent && this._modalContent.messageList && this._modalContent.messageList.length > 0) {
            this.toggleWindow(true);

            if (isMessagesDisplayed) {
                this._currentMessageTextToDisplayIndex = -1;
                this.displayNextMessage();
            }
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
        this._currentBoxDimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this._graphicObject = this.scene.add.graphics();
        
        this.setFixed(this._graphicObject);
        
        this.createOuterWindow(this._currentBoxDimensions.x, this._currentBoxDimensions.y, this._currentBoxDimensions.width, this._currentBoxDimensions.height);
        this.createInnerWindow(this._currentBoxDimensions.x, this._currentBoxDimensions.y, this._currentBoxDimensions.width, this._currentBoxDimensions.height);
        
        this.createCloseModalButton();

        this.hide();
    }
    
    private setFixed(object: Phaser.GameObjects.Graphics | Phaser.GameObjects.Text | Phaser.GameObjects.Sprite, depth: number = 100) {
        object.setScrollFactor(0);
        object.setDepth(depth);
    }
    
    private createNextPageButton(text: string = '>> Suivant') {
        if (this._currentMessageTextToDisplayIndex <= this._modalContent.messageList.length -1) {
            const x = this._currentBoxDimensions.x + this._currentBoxDimensions.width - 120;
            const y = this._currentBoxDimensions.y + this._currentBoxDimensions.height - 30;

            if (this._currentMessageTextToDisplayIndex === this._modalContent.messageList.length -1) {
                text = "[ Fermer ]";
            }

            if (! this._nextPageButton) {
                this._nextPageButton = this.createTextAsButton(x, y, text, 101, this.displayNextMessage.bind(this));
            }
            this._nextPageButton.setText(text);
        }
    }

    private displayNextMessage() {
        this._currentMessageTextToDisplayIndex ++;
        const currentMessage = this._modalContent.messageList[this._currentMessageTextToDisplayIndex];
        let currentAction = undefined;
        
        if (currentMessage) {
            this.createPeopleSpeakingBox(currentMessage,
                                        this._currentBoxDimensions.x, this._currentBoxDimensions.y, 
                                        this._currentBoxDimensions.width, this._currentBoxDimensions.height);

            currentAction = this.displayOnText.bind(this, currentMessage);
        }

        if (! currentMessage && this._modalContent.endingCallBack) {
            this._modalContent.endingCallBack();
        }

        if (! currentAction) {
            currentAction = this.hide.bind(this);
        }

        currentAction();
    }

    private createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.fillStyle(this._configuration.windowColor);
        this._graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    
    private createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.lineStyle(this._configuration.borderThickness, this._configuration.borderColor);
        this._graphicObject.strokeRect(x, y, rectWidth, rectHeight);
    }
    
    private createPeopleSpeakingBox(currentMessage: ModalText, x: number, y: number, rectWidth: number, rectHeight: number) {             
        const prefab = currentMessage.prefab;
    
        if (prefab) {
            this.setPrefabToDisplay(prefab);
            
            this.setFixed(this._displayingPersonSprite);            
            this._displayingPersonSprite.setPosition(x + 10 + this._configuration.padding * 2, y + rectHeight / 2 );
        }
    }

    private hideCurrentPrefabSprite() {
        if (this._displayingPersonSprite) {
            this._displayingPersonSprite.setVisible(false);
        }
    }

    private setPrefabToDisplay(prefab: Prefab) {
        this._displayingPersonSprite = this._listOfDisplayingSprites[prefab.key];

        if (! this._displayingPersonSprite) {
            this.hideCurrentPrefabSprite(); 

            this._displayingPersonSprite = this._scene.createSpriteByPrefabObject(<Prefab> prefab);
            this._listOfDisplayingSprites[prefab.key] = this._displayingPersonSprite;
        }
    }
    
    private getGameWidth() {
        return this.scene.sys.game.config.width;
    }
    
    private getGameHeight() {
        return this.scene.sys.game.config.height;
    }
    
    private calculateWindowDimensions(width: string | number, height: string | number): Position {
        var x = this._configuration.padding;
        var y = +height - this._configuration.windowHeight - this._configuration.padding;
        var rectWidth = +width  - (this._configuration.padding * 2);
        var rectHeight = this._configuration.windowHeight;
        
        return {
            x: x,
            y: y,
            width: rectWidth,
            height: rectHeight
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

        const x = this._configuration.padding + this._displayingPersonSprite.displayWidth + 20;
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
    
    private animateText(nexAction: Function) {
        this._eventCounter++;
        this._displayedMessage.setText(this._displayedMessage.text + this._messageInArray[this._eventCounter - 1]);
        
        if (this._eventCounter === this._messageInArray.length) {
            this._timedEvent.remove();

            if (nexAction) {
                nexAction();
            }
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
            callback: this.animateText.bind(this, this.createNextPageButton.bind(this)),
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

