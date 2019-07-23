import 'phaser';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';
import BattleScene from './scenes/BattleScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import JSONLevelScene from './scenes/JSONLevelScene';
import Inventory from './Inventory';

let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let titleScene = new TitleScene();
let worldScene = new WorldScene();
let battleScene = new BattleScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scaleMode: Phaser.ScaleModes.DEFAULT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    }
};

let game = new Phaser.Game(config);

game.inventory = new Inventory();

game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.add('TitleScene', titleScene);
game.scene.add('WorldScene', worldScene);
game.scene.add('BattleScene', battleScene);
game.scene.start("BootScene");
