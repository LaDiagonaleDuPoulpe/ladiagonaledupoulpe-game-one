import { BaseLevelScene } from "../scenes/base-level-scene";

/**
 * User input manager : each event listener launch action
 */
export class UserInputManager {
    //#region fields
    private _enabled = false;
    private _keyListeners = ['down', 'up'];
    //#endregion

    constructor(private _scene: BaseLevelScene) {
        //this._scene.configData
    }

    //#region internal methods
    private initialize() {
        this._keyListeners.forEach((key) => {
            this._scene.removeAllKeyboardListener(key);
            this._scene.attachActionToKeyboardEvent(key, this.processAction);
        }, this);
    }

    private processAction(event) {
        if (this._enabled) {
            
        }
    }
    //#endregion

    //#region properties
    /**
     * Sets User input listen to be enabled or not
     */
    public set enabled(value: boolean) {
        this._enabled = value;
    }
    //#endregion
}