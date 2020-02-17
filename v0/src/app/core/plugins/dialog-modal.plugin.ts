import { Dictionary } from '../../shared/custom-types/dictionary';
import { ModalContent } from '../models/dialog-modal/modal-content';
import { ModalText } from '../models/dialog-modal/modal-text';
import { Position } from '../models/position';
import { Prefab } from '../models/prefabs/prefab';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { BaseModalWithPrefabPlugin } from './base-modal-with-prefab.plugin';

/**
* Plugin to display a message box in current scene
*/
// https://phaser.io/examples/v3/view/plugins/scene-plugin-test-1
// TODO: See if we can split this class in several small ones
export class DialogModalPlugin extends BaseModalWithPrefabPlugin {
    //#region Fields
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
    private  _positionByDirectionList: Dictionary<Position>;
    //#endregion
    
    constructor(_scene: BaseMapLevelScene, pluginManager: Phaser.Plugins.PluginManager) {
        super(_scene, pluginManager);
    }
    
    //#region Public methods    
    
    /**
    * Show the message box
    * Be careful : if isMessagesDisplayed is set to true, 
    * you need to set message text list before calling this method
    */
    show(isMessagesDisplayed: boolean = true) {
        if (this._modalContent && this._modalContent.messageList && this._modalContent.messageList.length > 0) {
            super.show();

            if (isMessagesDisplayed) {
                this._currentMessageTextToDisplayIndex = -1;
                this.displayNextMessage();
            }
        }
    }

    /** Allows you to display or hide current box */
    public toggleWindow(visibility: boolean) {
        super.toggleWindow(visibility);
        this._closeButton.setVisible(visibility);
        
        if (this._displayedMessage) {
            this._displayedMessage.setVisible(visibility);
        }

        if (this._nextPageButton) {
            this._nextPageButton.setVisible(visibility);
        }
    }

    public refresh() {}
    //#endregion
    
    //#region Internal methods    
    /** Allows you to create the window with borders, and inside box with real content */
    protected createWindow() {
        super.createWindow();

        const gameHeight = this.getGameHeight();
        const gameWidth = this.getGameWidth();
        this._currentBoxDimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        
        this.createOuterWindow(this._currentBoxDimensions.x, this._currentBoxDimensions.y, 
                               this._currentBoxDimensions.width, this._currentBoxDimensions.height);

        this.createInnerWindow(this._currentBoxDimensions.x, this._currentBoxDimensions.y, 
                               this._currentBoxDimensions.width, this._currentBoxDimensions.height);
        
        this.createCloseModalButton();

        this.hide();
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
            this.createPeopleBox(currentMessage.prefab,
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
    
    private calculateWindowDimensions(width: string | number, height: string | number): Position {
        var x = this.configuration.padding;
        var y = +height - this.configuration.windowHeight - this.configuration.padding;
        var rectWidth = +width  - (this.configuration.padding * 2);
        var rectHeight = this.configuration.windowHeight;
        
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
                font: this.configuration.closeButtonStyle.font,
                fill: this.configuration.closeButtonStyle.fill
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
        
        const x = +this.getGameWidth() - this.configuration.padding - 30;
        const y = +this.getGameHeight() - this.configuration.windowHeight - this.configuration.padding + 3;
        
        this._closeButton = this.createTextAsButton(x, y, '[X]', 101, self.hide.bind(self));
    }
    
    private setText(value: string) {
        if (this._displayedMessage) {
            this._displayedMessage.destroy();
        }

        const x = this.configuration.padding + this.currentPrefab.displayWidth + 20;
        const y = +this.getGameHeight() - this.configuration.windowHeight - this.configuration.padding + 10;
        
        this._displayedMessage = this.scene.make.text({
            x: x,
            y: y,
            text: value,
            style: {
                font: this.configuration.contentStyle.font,
                fill: this.configuration.contentStyle.fill,
                wordWrap: { width: +this.getGameWidth() - (this.configuration.padding * 2) - this.currentPrefab.width }
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
            delay: 300 - (this.configuration.dialogSpeed * 30),
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

