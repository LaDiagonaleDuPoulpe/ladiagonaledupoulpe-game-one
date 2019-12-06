import { injectable } from 'tsyringe';

import { CloudSprite } from '../cloud.sprite';
import { PrefabType } from '../../../../shared/enums/prefab-type';
import { BaseLevelScene } from '../../../scenes/base-level.scene';
import { ObjectCreator } from './object-creator';
import { BaseMapLevelScene } from '../../../scenes/base-map-level.scene';

/**
 * Allows you to create a list of cloud, and manage them
 */
@injectable()
export class CloudCreator {
    //#region Fields
    private _clouds: CloudSprite[] = [];
    //#endregion

    constructor() {
    }

    //#region Public methods
    /**
     * Creates new object (sprite) and adds it in scene
     * @param scene Scene to add new object
     * @param objectCreator Creator of the object
     * @param saveInScene Function to add object in scene
     */
    public createNewOne(scene: BaseMapLevelScene, objectCreator: ObjectCreator, saveInScene: Function) {
        const isOkToGenerateCloud = Phaser.Math.Between(0, 100) % 35 === 0;

        if (isOkToGenerateCloud) {            
            const cloudSprite = scene.getOneObject(PrefabType.cloud);

            cloudSprite.x = -300;
            cloudSprite.y = Phaser.Math.Between(0, 450);

            objectCreator.createObject(cloudSprite, scene, saveInScene);
        }
    }
    //#endregion
}