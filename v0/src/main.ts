import "reflect-metadata";
import { container } from "tsyringe";

import { CustomGame } from './app/core/bootstrap/custom-game';

let game: CustomGame = null;

window.addEventListener("load", () => {
    game = container.resolve(CustomGame);
});
