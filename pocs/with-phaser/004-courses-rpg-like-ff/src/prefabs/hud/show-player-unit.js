import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import TextPrefab from '../text-prefab';
import ShowStatWithBar from './show-stat-with-bar';

/**
 * Prefabs to show data information from a unit (HP, MP, ...)
 */
class ShowPlayerUnit extends Prefab {
    
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
        this.playerUnitHealthBar.display(isShown);
        this.playerUnitManaBar.display(isShown);
        this.faceSprite.setVisible(isShown);
    }
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);

        this.prepareFaceInformations(properties);
        this.setUnitData(properties);
        this.playerUnitHealthBar = this.constructStatusBar('health', 'HP', properties);
        this.playerUnitManaBar = this.constructStatusBar('mana', 'MP', properties, 30);
    }     
    //#endregion

    //#region internal methods
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

    /**
     * Constructs status bar class and returns it
     * @param {string} key 
     * @param {string} title 
     * @param {JSON} properties 
     * @param {number} positionY 
     */
    constructStatusBar(key, title, properties, positionY) {
        const name = this.name + '_' + key;

        if (! positionY) {
            positionY = 0;
        }

        const position = {
            x: 0,
            y: 0 + positionY
        };

        const setting = {
            group: 'hud',
            anchor: {
                x: 0,
                y: 0
            },
            text: title,
            style: properties.textStyle,
            prefab: properties.prefab,
            stat: key,
            barTexture: key + 'bar_image'
        }

        return new ShowStatWithBar(this.scene, name, position, setting);
    }

    /**
     * Defines unitData attribute
     * @param {JSON} properties 
     */
    setUnitData(properties) {
        this.unitData = this.scene.prefabs[properties.prefab];
    }

    /**
     * Prepares face information of the unit
     * @param {JSON} properties 
     */
    prepareFaceInformations(properties) {
        this.faceTexture = properties.faceTexture;
        this.faceSprite = this.scene.add.sprite(this.x + 130, this.y, properties.faceTexture);
        this.faceSprite.setOrigin(0);
    }
    //#endregion
}

export default ShowPlayerUnit;