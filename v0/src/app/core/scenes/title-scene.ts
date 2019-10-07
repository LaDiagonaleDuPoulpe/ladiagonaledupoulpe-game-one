import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { JsonLevelScene } from "./json-level-scene";

@injectable()
export class TitleScene extends JsonLevelScene {
    constructor(protected _logger: DefaultLogger) {
        super(TitleScene.name, _logger);
    }

    //#region public methods
    
    //#endregion
}