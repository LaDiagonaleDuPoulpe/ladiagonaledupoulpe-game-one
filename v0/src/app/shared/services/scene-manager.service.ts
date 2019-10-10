import { injectable } from "tsyringe";

/**
 * Manager to gets current scene and next scene
 */
@injectable()
export class LevelManageService {
    //#region fields
    private _previousScene: string; 
    private _currentScene: string; 
    //#endregion

    constructor() {
        this._previousScene = '';
        this._currentScene = '';
    }

    //#region public methods
    public getNext() {
        
    }
    //#endregion
}