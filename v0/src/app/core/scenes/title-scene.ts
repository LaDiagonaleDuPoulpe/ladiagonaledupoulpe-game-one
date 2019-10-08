import { injectable } from "tsyringe";

import { DefaultLogger } from "../../shared/services/default-logger";
import { BaseLevelScene } from "./base-level-scene";

@injectable()
export class TitleScene extends BaseLevelScene {
    constructor(protected _logger: DefaultLogger) {
        super(TitleScene.name, _logger);
    }

    //#region public methods
    
    //#endregion
}