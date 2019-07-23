import firebase from 'firebase/app';

import TitleScene from './scenes/TitleScene';
import BattleScene from './scenes/BattleScene';
import WorldScene from './scenes/WorldScene';
import PauseScene from './scenes/PauseScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import Inventory from './Inventory';

let titleScene = new TitleScene();
let battleScene = new BattleScene();
let worldScene = new WorldScene();
let pauseScene = new PauseScene();
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

let firebaseConfig = {
    apiKey: "AIzaSyDeH6QKtjo-P3SvQ-kL0ry7-0wexoilSS4",
    authDomain: "phaser-rpg.firebaseapp.com",
    databaseURL: "https://phaser-rpg.firebaseio.com",
    projectId: "phaser-rpg",
    storageBucket: "phaser-rpg.appspot.com",
    messagingSenderId: "30038961490"
};
firebase.initializeApp(firebaseConfig);

let game = new Phaser.Game(config);

game.inventory = new Inventory();

game.scene.add('TitleScene', titleScene);
game.scene.add('BattleScene', battleScene);
game.scene.add('WorldScene', worldScene);
game.scene.add('PauseScene', pauseScene);
game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.start('BootScene', {scene: 'title'});