import "reflect-metadata";
import { container } from "tsyringe";

import { CustomGame } from './app/core/bootstrap/custom-game';
import { GameConfig } from './app/core/config/game-config';

let game: CustomGame = null;

window.addEventListener("load", () => {
    game = new CustomGame(<any>new GameConfig().forRoot());
});