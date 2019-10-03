import { Logger } from '../logs/logger';

/**
 * Parent class of all custom scenes of the game
 */
export class BaseScene extends Phaser.Scene {
    constructor(protected logger: Logger) {
        super({
            key: ''
        });
    }
}