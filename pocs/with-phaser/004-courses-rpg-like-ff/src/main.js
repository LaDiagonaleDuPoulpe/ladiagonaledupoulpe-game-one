import TitleScene from './scenes/title-scene';
import WordScene from './scenes/world-scene';
import BootScene from './scenes/boot-scene';
import LoadingScene from './scenes/loading-scene';

const TITLE_SCENE_KEY = 'TitleScene';
const BOOT_SCENE_KEY = 'BootScene';
const LOADING_SCENE_KEY = 'LoadingScene';
const WORLD_SCENE_KEY = 'WorldScene';


let titleScene = new TitleScene();
let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let worldScene = new WordScene(); 

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640
};



let game = new Phaser.Game(config);
game.scene.add(TITLE_SCENE_KEY, titleScene);
game.scene.add(WORLD_SCENE_KEY, worldScene);
game.scene.add(BOOT_SCENE_KEY, bootScene);
game.scene.add(LOADING_SCENE_KEY, loadingScene);

game.scene.start(BOOT_SCENE_KEY, { scene: 'title' });