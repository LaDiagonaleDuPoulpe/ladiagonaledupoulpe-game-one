import "reflect-metadata";

import { CustomGame } from './app/bootstrap/custom-game';
import config from './app/config/config';

let game = null;

window.addEventListener("load", () => {
    game = new CustomGame(config);
});

window.addEventListener('resize', (event) => {
    if(game) {
        game.scale.resize(window.innerWidth, window.innerHeight);
    }
});