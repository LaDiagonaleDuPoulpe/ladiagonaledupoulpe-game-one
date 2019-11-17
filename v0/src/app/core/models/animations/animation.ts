/**
 * Animation item in json file
 */
export class animation {
    //#region properties
    /**
     * Key of the animation. To be unic in array
     */
    public key: string;

    /**
     * Frame per second value
     */
    public fps: number;

    /**
     * List of frames in the sprite to animate
     */
    public frames: number[];
    //#endregion
}