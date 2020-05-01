import { injectable, singleton } from "tsyringe";
import { Level } from '../../core/models/levels/level';
import { Logger } from '../../loggers/logger';
import { SceneKeyType } from '../enums/scene-key-type';

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
    public next(sceneKey?: string): string {
        if (sceneKey) {
            this._currentLevelKey = sceneKey;
        } else {
            this._previousLevelKey = this._currentLevelKey;
            
            // TODO: 29/12/2019, see to change the level key calling with string to a beter way
            
            if (this._previousLevelKey == '') {
                this._currentLevelKey = SceneKeyType.initialize;
            }
    
            if (this._previousLevelKey == SceneKeyType.initialize) {
                //this._currentLevelKey = 'title'; // when you're ready, replace it by 'title'
                this._currentLevelKey = SceneKeyType.insideBrokenShip; // when you're ready, replace it by 'title'
            }
    
            if (this._previousLevelKey === SceneKeyType.title) {
                this._currentLevelKey = SceneKeyType.firstVideo;
            }
            
            if (this._previousLevelKey == SceneKeyType.firstVideo) {
                this._currentLevelKey = SceneKeyType.insideBrokenShip;
            }
        }
        
        return this._currentLevelKey;
    }

    /** Sets the scene when player is dying */
    public setDyingStep() {
        this._currentLevelKey = '-100-dying-player';

        return this._currentLevelKey;
    }

    /** Sets the scene when player is died and game is over */
    public setEndGameStep() {
        this._currentLevelKey = '-200-end-game';

        return this._currentLevelKey;
    }
    //#endregion
}