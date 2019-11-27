/**
 * Type of prefab (background, text, ...)
 */
export enum PrefabType {
    /** Backgroud of the scene  */
    background = 'background',
    /** Text to display */
    text = 'text',
    /** Clickable text, like hypertext */
    clickableText = 'clickableText',
    /** Button with image, may be clickable */
    buttonImage = 'buttonImage',
    /** Sprite to load a video */
    video = 'video',
    /** Waves to animate */
    wave = 'wave',
    /** Cloud to load, and animate */
    cloud = 'cloud',
    /** Static image to load */
    static = 'staticImage',
    /** Arcade sprite */
    default = 'arcade',
    /** Sprite sheet with frames animation */
    animated = 'animsprite'
}