import { injectable } from 'tsyringe';

import { CloudSprite } from '../cloud.sprite';

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

    //#region Pblic methods
    public createOne() {

    }
    //#endregion
}