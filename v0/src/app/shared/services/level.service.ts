import { Observable, of } from 'rxjs';

import { Level } from "../../core/models/level";
import { SceneType } from '../enums/scene-type';

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

        levels.push(new Level('title', SceneType.title));
        levels.push(new Level('000-inside-broken-ship', SceneType.boot));

        return of(levels);
    }
    //#endregion
}