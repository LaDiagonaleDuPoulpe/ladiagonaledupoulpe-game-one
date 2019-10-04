import "reflect-metadata";
import { container } from "tsyringe";

import { CustomGame } from './app/bootstrap/custom-game';
import { Config } from './app/config/config';

const BOOT_SCENE_KEY = 'BootScene';

let game: CustomGame = null;

window.addEventListener("load", () => {
    //game = new CustomGame(config);
    game = container.resolve(CustomGame);
});

window.addEventListener('resize', (event) => {
    if (game) {
        game.scale.resize(window.innerWidth, window.innerHeight);
    }
});