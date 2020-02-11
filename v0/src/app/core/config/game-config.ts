import "phaser";
import { DialogModalPlugin } from '../plugins/dialog-modal.plugin';
import { StatsPlayerBoxManagerPlugin } from '../plugins/stats-player-box-manager.plugin';
import { StatusBarPlugin } from '../plugins/status-bar.plugin';

type scaleMode = 'FIT' | 'SMOOTH';

const DEFAULT_WIDTH: number = 1024;
const DEFAULT_HEIGHT: number = 576;
const MAX_WIDTH: number = 1536;
const MAX_HEIGHT: number = 864;
let SCALE_MODE: scaleMode = 'SMOOTH';

const defaultConfig =  {
    type: Phaser.AUTO,
    parent: 'la-diagonale-du-poulpe',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        scene: [
            { key: 'dialogModalPlugin', plugin: DialogModalPlugin, mapping: 'dialogModalPlugin' },
            { key: 'playerStatModalManagerPlugin', plugin: StatsPlayerBoxManagerPlugin, mapping: 'playerStatModalManagerPlugin' },
            { key: 'statusBarPlugin', plugin: StatusBarPlugin, mapping: 'StatusBarPlugin'}
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    }
};

/**
* Gets default config for the game
*/
export class GameConfig {
    //#region public methods
    /**
    * Returns singleton of the default real config for the game
    */
    forRoot() {
        return defaultConfig;
    }
    //#endregion
}