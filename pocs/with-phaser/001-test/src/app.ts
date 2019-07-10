// error : cannot fin name ActiveXObject 
// => https://github.com/photonstorm/phaser/issues/4027
import "phaser";
import TestScene from './play-scene';


export class StarfallGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }

    
}

// STARTER : https://phaser.io/tutorials/getting-started-phaser3/part5
// https://github.com/troyedwardsjr/phaser3-typescript-webpack/tree/master/src
// https://www.freecodecamp.org/news/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135/


window.onload = () => {  
    const game = new StarfallGame(<Phaser.Types.Core.GameConfig> { 
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: TestScene
    });    
};