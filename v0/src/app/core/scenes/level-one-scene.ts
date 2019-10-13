import { injectable } from "tsyringe";
import { BaseScene } from "./base-scene";
import { LevelManageService } from "../../shared/services/level-manager.service";
import { DefaultLogger } from "../../shared/services/default-logger";

/**
 * Level one of the game
 */
@injectable()
export class LevelOneScene extends BaseScene {
    constructor(protected _logger: DefaultLogger,
        private _levelManageService: LevelManageService) {
        super(LevelOneScene.name, _logger);
    }
}