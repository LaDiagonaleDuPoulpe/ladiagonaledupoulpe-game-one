import { AssetSize } from './asset-size';

/**
 * Frame setting
 */
export class AssetFrame {
    //#region fields
    /**
     * Dimension of the frame
     */
    public dimension: AssetSize;

    /**
     * Margin in each image
     */
    public margin: number;

    /**
     * Spacing between frames
     */
    public spacing: number;
    //#endregion
}