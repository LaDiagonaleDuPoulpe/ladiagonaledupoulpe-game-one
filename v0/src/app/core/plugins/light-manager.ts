import { injectable } from 'tsyringe';
import { toHexaInt } from '../../shared/converters/string-converter';
import { EllipseLight } from '../models/stage/ellipse-light';
import { BaseLevelScene } from '../scenes/base-level.scene';
/**
* Allows you to add one light in current scene
* It enables light management in scene if it's not already done
*/
@injectable()
export class LightManager {
    constructor() {
    }
    
    //#region Public methods
    /**
    * Creates new light, and adds it in scene
    */
    create(scene: BaseLevelScene, data: EllipseLight): Phaser.GameObjects.Light {
        if (! scene.lights.active) {
            scene.lights.enable();
        }
        
        const colorInInt = toHexaInt(data.properties.style.fill);
        
        const light = scene.lights.addLight(data.position.x, data.position.y, data.size.radius)
                                        .setColor(0xffffff)
                                        .setIntensity(2);
        
        const ellipse = new Phaser.Geom.Ellipse(light.x, light.y, 
                                                data.size.width, data.size.height);

        const point = new Phaser.Geom.Point(light.x, light.y);

        scene.time.addEvent({
            delay: data.properties.delay,
            callback: function ()
            {
                Phaser.Geom.Ellipse.Random(ellipse, <Phaser.Geom.Point> <unknown> light);
            },
            callbackScope: this,
            repeat: -1
        });
        
        return light;
    }
    //#endregion
}