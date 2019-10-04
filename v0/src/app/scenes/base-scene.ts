import { DefaultLogger } from '../services/default-logger';

/**
 * Parent class of all custom scenes of the game
 */
export class BaseScene extends Phaser.Scene {
    constructor(key: string, protected _logger: DefaultLogger) {
        super({
            key: key
        });
    }
}