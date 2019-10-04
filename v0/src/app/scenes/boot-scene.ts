import { BaseScene } from './base-scene';
import { Logger } from '../logs/logger';

/**
 * Boot scene : scene will be loaded to start the game
 */
export class BootScene extends BaseScene {
    constructor(logger: Logger) {
        super(logger);
    }
}