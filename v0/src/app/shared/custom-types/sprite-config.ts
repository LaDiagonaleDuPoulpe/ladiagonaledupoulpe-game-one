import { BaseLevelScene } from '../../core/scenes/base-level.scene';
/**
* Contract from configuration of one sprite 
* (for example : creating new sprite)
* You can use it to specify which parameters you need in param function 
*/
export interface SpriteConfig {
    scene: BaseLevelScene;
    name: string; 
    type: string; 
    x: number; 
    y: number;
    depth: number, 
    texture: string;
    group: string; 
    frame?: string;
}