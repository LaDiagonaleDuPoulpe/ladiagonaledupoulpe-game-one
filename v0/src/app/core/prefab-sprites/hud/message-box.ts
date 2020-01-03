import { PrefabSprite } from '../prefab.sprite';
import { BaseLevelScene } from '../../scenes/base-level.scene';
import { Position } from '../../models/position';
import { PropertiesSetting } from '../../models/properties-setting';
import { AnimationsCreator } from '../animations/animations-creator';
import { TextPrefabSprite } from '../text-prefab.sprite';
/**
 * Box to display message in front of the current scene
 */
export class MessageBox extends PrefabSprite {
    //#region Fields
    private _messageText: TextPrefabSprite;
    //#endregion

    constructor(protected _scene: BaseLevelScene, 
                name: string, 
                protected _position: Position, 
                protected _properties: PropertiesSetting,
                _animationCreator: AnimationsCreator) {
        super(_scene, name, _position, _properties, _animationCreator);        
    }

    //#region Internal methods
    protected initialize() {
        super.initialize();

        const newPosition = {
            x: this.x + (this.width / 2),
            y: this.y + 50
        };

        const newProperties = {
            group: 'hud',
            text: this._properties.message, 
            style: Object.create(this._scene.defaultStyle)
        };

        this._messageText = new TextPrefabSprite(this._scene, this.name + 'Message', newPosition, newProperties);
        this.setOrigin(0);

        this._messageText.setOrigin(0.5);
    }
    //#endregion
}