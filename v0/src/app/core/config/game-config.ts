import "phaser";

const defaultConfig =  {
    type: Phaser.AUTO,
    parent: 'la-diagonale-du-poulpe',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
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