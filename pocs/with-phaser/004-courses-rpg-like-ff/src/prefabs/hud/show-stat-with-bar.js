import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import TextPrefab from '../text-prefab';

/**
 * Prefabs to show data information in a status bar
 */
class ShowStatWithBar extends TextPrefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods  
    update() {
        this.updateScaleOfBar();
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.setUnitData(properties);
        this.stat = properties.stat;
        this.createBar(properties);
    }     
    //#endregion

    //#region internal methods
    updateScaleOfBar() {
        this.currentStat = this.unitData[this.stat];
        this.barSprite.setScale(this.currentStat / 100, 1.0);
    }

    createBar(properties) {
        this.barSprite = this.scene.add.sprite(this.x, this.y + 20, properties.barTexture);
        this.barSprite.setOrigin(0);
    }

    setUnitData(properties) {
        this.unitData = this.scene.prefabs[properties.prefab];
    }
    //#endregion
}

export default ShowStatWithBar;