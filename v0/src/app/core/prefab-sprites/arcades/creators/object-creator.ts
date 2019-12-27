import { injectable } from 'tsyringe';

import { SpriteConfig } from '../../../../shared/custom-types/sprite-config';
import { PrefabType } from '../../../../shared/enums/prefab-type';
import { PropertiesSetting } from '../../../models/properties-setting';
import { BaseLevelScene } from '../../../scenes/base-level.scene';
import { PrefabSpriteFactory } from '../../prefab-sprite-factory';
import { Position } from '../../../models/position';
import { timingSafeEqual } from 'crypto';

/**
* Allows you to create an object like a sprite
*/
@injectable()
export class ObjectCreator {
    //#region Public methods
    /**
    * Creates one object from a sprite object 
    * @param spriteObject Sprite object from objects list
    */
    public createObject(spriteObject: Phaser.Types.Tilemaps.TiledObject, scene: BaseLevelScene, saveInSprite: Function): Phaser.GameObjects.Sprite {
        let createdSprite: Phaser.GameObjects.Sprite = null;

        if (spriteObject.visible) {
            const config: SpriteConfig = {
                scene: scene,
                name: spriteObject.name,
                type: spriteObject.type,
                x: spriteObject.x,
                y: spriteObject.y,
                visible: this.getPropertyValue('visible', spriteObject),
                depth: this.getPropertyValue('depth', spriteObject),
                texture: this.getPropertyValue('texture', spriteObject),
                group: this.getPropertyValue('group', spriteObject),
                frame: this.getPropertyValue('frame', spriteObject)
            };
            
            createdSprite = this.createObjectWithDetails(config, saveInSprite);
        }

        return createdSprite;
    }
    
    /**
    * Creates one object from all details
    */
    public createObjectWithDetails(config: SpriteConfig, saveInSprite: Function): Phaser.GameObjects.Sprite {
        const objectPosition = {
            x: config.x,
            y: config.y
        };
        
        const properties = {
            depth: config.depth,
            texture: config.texture,
            frame: config.frame,
            group: config.group
        };

        return this.createObjectWithAllProperties(<PrefabType> config.type, name, objectPosition, config.scene, 
                                                  <PropertiesSetting> properties, saveInSprite);
    }

    /**
     * Creates a prefab, add in scene, and return it
     * @param type Type of the prefab
     * @param name Name of the prefab
     * @param position Position (x, y) of the prefab
     * @param scene Scene to add the prefab
     * @param properties All config of the prefab (frame, depth, ...)
     * @param saveInSprite
     */
    public createObjectWithAllProperties(type: PrefabType, name: string, position: Position, scene: BaseLevelScene, properties: PropertiesSetting, saveInSprite: Function): Phaser.GameObjects.Sprite {
        const sprite = PrefabSpriteFactory.create(type, scene, name, position, <PropertiesSetting> properties);
        
        saveInSprite(sprite, properties.group, name);

        return sprite;
    }
    //#endregion
    
    //#region Internal methods
    private getPropertyValue(key: string, spriteObject: Phaser.Types.Tilemaps.TiledObject): any {
        const propertiesArray = <Array<any>> spriteObject.properties;
        const item = propertiesArray.find(item => item.name === key);
        
        return item ? item.value : null;
    }
    //#endregion
}