/**
 * Animation item in json file
 */
export class Animation {
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

    /** 
     * Repat value : -1, infinite 
     * */
    public repeat: number;

    /**
     * Size of the number for each frame (0 => 1, 000 => 3)
     */
    public zeroPad: string; 
    
    /**
     * Prefix name of the frame animation
     */
    public prefix: string | null;

    /**
     * Suffix of the frame animation
     */
    public suffix: string | null;
    //#endregion
}