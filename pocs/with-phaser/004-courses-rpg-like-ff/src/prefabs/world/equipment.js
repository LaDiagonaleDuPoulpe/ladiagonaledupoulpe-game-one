import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';

/**
 * Equipment that could be present in the worl scene
 */
class Equipment extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods    
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
        
        this.setScale(0.3, 0.3);
        this.unitName = properties.unitName;
        this.bodyPart = properties.bodyPart;
        this.stat = properties.stat;
        this.bonus = +properties.bonus;
        this.textureName = properties.texture;

        this.body.immovable = true;
        this.body.setSize(this.width * this.scaleX, this.height * this.scaleY);

        this.scene.physics.add.collider(this, this.scene.groups.players, this.collect, null, this);
    }        
        
    /**
    * Actions when user touch an equipment
    */
   collect() {
        const unitData = this.scene.cache.game.partyData[this.unitName];
        this.updateUnitBodyPart(unitData);
    }
    //#endregion

    //#region internal methods    
    /**
     * Updates unit body part
     * @param {JSON} unitData 
     */
    updateUnitBodyPart(unitData) {
        const isDifferentEquipement = unitData.equipment[this.bodyPart].name !== this.name;

        if (isDifferentEquipement) {
            unitData.equipment[this.bodyPart] = {
                name: this.name,
                texture: this.textureName
            };
            unitData.statsBonus[this.stat] = this.bonus;
            this.destroy();
        }
    }
    //#endregion
}

export default Equipment;