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

    setUnitData(properties) {
        this.unitData = this.scene.prefabs[properties.prefab];
    }

    prepareFaceInformations(properties) {
        this.faceTexture = properties.faceTexture;
        this.faceSprite = this.scene.add.sprite(this.x + 130, this.y, properties.faceTexture);
        this.faceSprite.setOrigin(0);
    }
    //#endregion
}

export default ShowPlayerUnit;