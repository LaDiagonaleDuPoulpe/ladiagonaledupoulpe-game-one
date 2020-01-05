import { BaseLevelScene } from '../scenes/base-level.scene';
import { BaseMapLevelScene } from '../scenes/base-map-level.scene';
import { DialogModalConfiguration } from '../models/dialog-modal-configuration';

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
    private _contentMessage: Phaser.GameObjects.Text;
    private _messageInArray: string[];
    private _eventCounter = 0;
    private _timedEvent: Phaser.Time.TimerEvent;
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
        this.toggleWindow(true);
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

        if (this._contentMessage) {
            this._contentMessage.setVisible(visibility);
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
        
        this.createCloseModalButton();
        
        this.hide();
    }
    
    private setFixed(object: Phaser.GameObjects.Graphics | Phaser.GameObjects.Text, depth: number = 100) {
        object.setScrollFactor(0);
        object.setDepth(depth);
    }
    
    private createInnerWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.fillStyle(this._configuration.windowColor);
        this._graphicObject.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
    
    private createOuterWindow(x: number, y: number, rectWidth: number, rectHeight: number) {
        this._graphicObject.lineStyle(this._configuration.borderThickness, this._configuration.borderColor);
        this._graphicObject.strokeRect(x, y, rectWidth, rectHeight);
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
    
    private createCloseModalButton() {
        var self = this;
        
        const x = +this.getGameWidth() - this._configuration.padding - 30;
        const y = +this.getGameHeight() - this._configuration.windowHeight - this._configuration.padding + 3;
        
        this._closeButton = this.scene.make.text({
            x: x,
            y: y,
            text: '[X]',
            style: {
                font: this._configuration.closeButtonStyle.font,
                fill: this._configuration.closeButtonStyle.fill
            }
        });
        
        this.setFixed(this._closeButton, 101);
        
        this._closeButton.setInteractive();
        
        this._closeButton.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        this._closeButton.on('pointerout', function () {
            this.clearTint();
        });
        this._closeButton.on('pointerdown', function () {
            self.hide();
        });
    }
    
    private setText(value: string) {
        if (this._contentMessage) {
            this._contentMessage.destroy();
        }
        
        const x = this._configuration.padding + 10;
        const y = +this.getGameHeight() - this._configuration.windowHeight - this._configuration.padding + 10;
        
        this._contentMessage = this.scene.make.text({
            x: x,
            y: y,
            text: value,
            style: {
                wordWrap: { width: +this.getGameWidth() - (this._configuration.padding * 2) - 25 }
            }
        });
        
        this.setFixed(this._contentMessage, 101);
    }
    
    private animateText() {
        this._eventCounter++;
        this._contentMessage.setText(this._contentMessage.text + this._messageInArray[this._eventCounter - 1]);

        if (this._eventCounter === this._messageInArray.length) {
            this._timedEvent.remove();
        }
    }
    //#endregion
    
    //#region Properties    
    /**
    * Text to be displayed
    */
    public set text(value: string) {
        this._eventCounter = 0;
        this._messageInArray = value.split('');
        
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
    //#endregion
}

