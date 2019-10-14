import { injectable } from "tsyringe";
import { Level } from '../../core/models/level';

/**
 * Manager to gets current scene and next scene
 */
@injectable()
export class LevelManageService {
    //#region fields
    private _previousLevelKey: string; 
    private _currentLevelKey: string; 
    //#endregion

    constructor() {
        this._previousLevelKey = '';
        this._currentLevelKey = '';
    }

    //#region public methods
    init() {
    }

    /**
     * Go to next level key to load
     */
    public next(): string {
        this._previousLevelKey = this._currentLevelKey;

        if (this._previousLevelKey === '') {
            this._currentLevelKey = 'title';
        }

        if (this._previousLevelKey == 'title') {
            this._currentLevelKey = '000-inside-broken-ship';
        }

        return this._currentLevelKey;
    }
    //#endregion
}