import { injectable, singleton } from "tsyringe";
import { Level } from '../../core/models/levels/level';
import { Logger } from '../../loggers/logger';

/**
* Manager to gets current scene and next scene
*/
@singleton()
export class LevelManageService {
    //#region fields
    private _previousLevelKey: string; 
    private _currentLevelKey: string; 
    //#endregion
    
    constructor(private _logger: Logger) {
        this._previousLevelKey = '';
        this._currentLevelKey = '';
        
        this._logger.log('LevelManageService', 'constructor');
    }
    
    //#region public methods
    init() {
    }
    
    /**
    * Go to next level key to load
    */
    public next(): string {
        this._previousLevelKey = this._currentLevelKey;
        
        
        if (this._previousLevelKey == '') {
            this._currentLevelKey = 'title';
        }

        if (this._previousLevelKey === 'title') {
            this._currentLevelKey = '000-video-intro';
        }
        
        if (this._previousLevelKey == '000-video-intro') {
            this._currentLevelKey = '000-inside-broken-ship';
        }
        
        return this._currentLevelKey;
    }
    //#endregion
}