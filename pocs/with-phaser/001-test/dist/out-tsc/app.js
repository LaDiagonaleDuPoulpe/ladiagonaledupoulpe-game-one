import * as tslib_1 from "tslib";
// error : cannot fin name ActiveXObject 
// => https://github.com/photonstorm/phaser/issues/4027
import "phaser";
import TestScene from './play-scene';
var StarfallGame = /** @class */ (function (_super) {
    tslib_1.__extends(StarfallGame, _super);
    function StarfallGame(config) {
        return _super.call(this, config) || this;
    }
    return StarfallGame;
}(Phaser.Game));
export { StarfallGame };
// STARTER : https://phaser.io/tutorials/getting-started-phaser3/part5
// https://github.com/troyedwardsjr/phaser3-typescript-webpack/tree/master/src
// https://www.freecodecamp.org/news/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135/
window.onload = function () {
    var game = new StarfallGame({
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
//# sourceMappingURL=app.js.map