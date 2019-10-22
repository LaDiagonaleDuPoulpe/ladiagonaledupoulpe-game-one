import "reflect-metadata";
import { container } from "tsyringe";

import { CustomGame } from './app/core/bootstrap/custom-game';

let game: CustomGame = null;

window.addEventListener("load", () => {
    game = container.resolve(CustomGame);
});

// window.addEventListener('resize', (event) => {
//     if (game) {
//         console.log('game resize', game);
//         game.resize();
//     }
// });