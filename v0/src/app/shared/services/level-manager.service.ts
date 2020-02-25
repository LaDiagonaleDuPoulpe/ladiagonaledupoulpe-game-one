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
    }
    
    //#region public methods
    init() {
    }
    
    /**
    * Go to next level key to load
    */
    public next(): string {
        this._previousLevelKey = this._currentLevelKey;
        
        // TODO: 29/12/2019, see to change the level key calling with string to a beter way
        
        if (this._previousLevelKey == '') {
            this._currentLevelKey = 'initialize';
        }

        if (this._previousLevelKey == 'initialize') {
            this._currentLevelKey = '000-inside-broken-ship'; // when you're ready, replace it by 'title'
        }

        if (this._previousLevelKey === 'title') {
            this._currentLevelKey = '000-video-intro';
        }
        
        if (this._previousLevelKey == '000-video-intro') {
            this._currentLevelKey = '000-inside-broken-ship';
        }
        
        return this._currentLevelKey;
    }

    /** Sets the scene when player is dying */
    public goToDying() {
        this._currentLevelKey = '-100-dying-player';

        return this._currentLevelKey;
    }

    /** Sets the scene when player is died and game is over */
    public goToEndGame() {
        this._currentLevelKey = '-200-end-game';

        return this._currentLevelKey;
    }
    //#endregion
}