import { injectable } from "tsyringe";
import { Level } from '../../core/models/level';

/**
 * Manager to gets current scene and next scene
 */
@injectable()
export class LevelManageService {
    //#region fields
    private _previousLevel: string; 
    private _currentLevel: string; 
    private _levels: Level[] = null;
    //#endregion

    constructor() {
        this._previousLevel = '';
        this._currentLevel = '';
    }

    //#region public methods
    /**
     * Defines list of level
     * @param levels List of level
     */
    init(levels: Level[]) {
        this._levels = levels;
    }

    public getNext() {
        this._previousLevel = this._currentLevel;
    }
    //#endregion
}