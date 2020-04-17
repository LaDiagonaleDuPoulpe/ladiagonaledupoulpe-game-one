import "reflect-metadata";
import { container } from "tsyringe";

import { CustomGame } from './app/core/bootstrap/custom-game';
import { environment } from './app/environments/environment';

let game: CustomGame = null;

    
defineGameVersion();

window.addEventListener("load", () => {
    game = container.resolve(CustomGame);
});


function defineGameVersion() {
    const div = document.getElementById('la-diagonale-du-poulpe');
    const attribute = document.createAttribute("ddp-version"); 
    attribute.value = environment.version.toString();
    div.setAttributeNode(attribute);
}
