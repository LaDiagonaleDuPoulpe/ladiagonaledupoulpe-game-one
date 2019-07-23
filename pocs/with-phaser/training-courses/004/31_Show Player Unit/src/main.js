import TitleScene from './scenes/TitleScene';
import BattleScene from './scenes/BattleScene';
import WorldScene from './scenes/WorldScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';

let titleScene = new TitleScene();
let battleScene = new BattleScene();
let worldScene = new WorldScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    }
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.add('BattleScene', battleScene);
game.scene.add('WorldScene', worldScene);
game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.start('BootScene', {scene: 'title'});