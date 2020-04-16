import "phaser";
import { MainScene } from '../scenes/main-scene';

type scaleMode = 'FIT' | 'SMOOTH';

const DEFAULT_WIDTH: number = 1024;
const DEFAULT_HEIGHT: number = 576;
const MAX_WIDTH: number = 1536;
const MAX_HEIGHT: number = 864;
let SCALE_MODE: scaleMode = 'SMOOTH';

// const defaultConfig =  {
//     type: Phaser.AUTO,
//     parent: 'la-diagonale-du-poulpe',
//     width: window.innerWidth,
//     height: window.innerHeight,
//     // pixelArt: true,
//     // roundPixels: true,
//     // scale: {
//     //     mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
//     //     autoCenter: Phaser.Scale.CENTER_BOTH
//     // },
//     // physics: {
//     //     default: 'arcade',
//     //     arcade: {
//     //         gravity: {
//     //             y: 0
//     //         },
//     //         debug: true
//     //     }
//     // }
// };

var defaultConfig = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600
    // scene: {
    //     create: function() {
    //         console.log('create !!')
    //     },
    //     update: function() {
    //         console.log('update')
    //     }
    // }
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