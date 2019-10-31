import { Observable, of } from "rxjs";
import { SceneConfig } from "../../core/models/scenes/scene-config";

/**
 * Service to load configuration of each scene (color, text, font, ...)
 */

 export class SceneConfigService {
    //#region public methods
    /**
     * Gets default config
     */
    public loadDefault(): Observable<SceneConfig> {
        const config = new SceneConfig();

        config.font = 'Kells';
        config.foreColor = '#ffffff';

        return of(config);
    }
    //#endregion
}