import TitleScene from './scenes/title-scene';
import WordScene from './scenes/world-scene';
import BootScene from './scenes/boot-scene';
import LoadingScene from './scenes/loading-scene';
import BattleScene from './scenes/battle-scene';
import Inventory from './global/inventory';
import PauseScene from './scenes/pause-scene';

const TITLE_SCENE_KEY = 'TitleScene';
const BOOT_SCENE_KEY = 'BootScene';
const LOADING_SCENE_KEY = 'LoadingScene';
const WORLD_SCENE_KEY = 'WorldScene';
const BATTLE_SCENE_KEY = 'BattleScene';
const PAUSE_SCENE_KEY = 'PauseScene';


let titleScene = new TitleScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let worldScene = new WordScene();
let battleScene = new BattleScene();
let pauseScene = new PauseScene();

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    }
};

let game = new Phaser.Game(config);

game.inventory = new Inventory();

game.scene.add(TITLE_SCENE_KEY, titleScene);
game.scene.add(WORLD_SCENE_KEY, worldScene);
game.scene.add(BOOT_SCENE_KEY, bootScene);
game.scene.add(LOADING_SCENE_KEY, loadingScene);
game.scene.add(BATTLE_SCENE_KEY, battleScene);
game.scene.add(PAUSE_SCENE_KEY, pauseScene);

game.scene.start(BOOT_SCENE_KEY, { scene: 'title' });