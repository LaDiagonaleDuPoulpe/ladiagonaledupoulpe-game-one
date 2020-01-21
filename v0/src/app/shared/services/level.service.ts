import { Observable, of } from 'rxjs';

import { Level } from "../../core/models/levels/level";
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

        levels.push(new Level('initialize', SceneType.initialize));
        levels.push(new Level('title', SceneType.title));
        levels.push(new Level('000-video-intro', SceneType.video));
        levels.push(new Level('000-inside-broken-ship', SceneType.insideSpaceShipMap));

        return of(levels);
    }
    //#endregion
}