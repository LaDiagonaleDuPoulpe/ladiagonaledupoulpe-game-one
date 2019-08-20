import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import TextPrefab from '../text-prefab';
import ShowStatWithBar from './show-stat-with-bar';
import ShowPlayerUnit from './show-player-unit';

/**
 * Prefabs to show data information from a unit (HP, MP, ...)
 */
class ShowPlayerUnitInPauseScreen extends ShowPlayerUnit {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods  
    /**
     * Updates status bar
     */
    change(prefab, faceTexture) {
        this.updateUnitData(prefab);
        this.updateFaceTexture(faceTexture);
    }

    /**
     * Shows or hides status bar
     * @param {boolean} isShown 
     */
    display(isShown) {
        super.display(isShown);

        this.showUnitAttack.setVisible(isShown);
        this.showUnitDefense.setVisible(isShown);
        this.showUnitMagicAttack.setVisible(isShown);
        this.showUnitSpeed.setVisible(isShown);
        this.levelText.setVisible(isShown);
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        const prefabData = this.scene.cache.game.partyData[properties.prefab];

        this.showUnitAttack = this.addZoneToDisplay(prefabData.stats.attack, 'Attack : \n', 250, 0);
        this.showUnitDefense = this.addZoneToDisplay(prefabData.stats.attack, 'Defense : \n', 250, 50);
        this.showUnitMagicAttack = this.addZoneToDisplay(prefabData.stats.magicAttack, 'Magic : \n', 400, 0);
        this.showUnitSpeed = this.addZoneToDisplay(prefabData.stats.speed, 'Speed : \n', 400, 50);

        this.addZoneAboutLevel(prefabData);
    }     
    //#endregion

    //#region internal methods
    addZoneAboutLevel(prefabData) {
        this.levelText = this.addZoneToDisplay(prefabData.currentLevel + 1, 'Level', 130, 50);
    }

    addZoneToDisplay(value, textValue, addXPosition, addYPosition) {
        const text = this.scene.add.text(this.x + addXPosition, this.y + addYPosition, textValue + value, properties.style);
        text.setOrigin(0);

        return text;
    }

    /**
     * Updates face texture, with the texture attribute
     * @param {JSON} texture 
     */
    updateFaceTexture(texture) {
        this.faceSprite.setTexture(texture);
    }

    /**
     * Updates unit data, by setting new with prefab attribute
     * @param {JSON} prefab 
     */
    updateUnitData(prefab) {
        this.unitData = prefab;

        this.playerUnitHealthBar.unitData = this.unitData;
        this.playerUnitManaBar.unitData = this.unitData;
    }
    //#endregion
}

export default ShowPlayerUnitInPauseScreen;