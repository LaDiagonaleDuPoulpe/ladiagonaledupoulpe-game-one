import { Observable, of } from 'rxjs';

import { Level } from "../../core/models/level";
import { SceneKey } from '../constants/scene-key';

/**
 * Service to load, save levels of the game
 */
export class LevelService {
    //#region public methods
    /**
     * Selects all services
     */
    public selectAll(): Observable<Level[]> {
        const levels = [];

        levels.push(new Level('title', SceneKey.title));

        return of(levels);
    }
    //#endregion
}