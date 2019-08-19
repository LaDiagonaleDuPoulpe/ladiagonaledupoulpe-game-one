import Prefab from '../prefab';
import TitleScene from '../../scenes/title-scene';
import MenuItem from './menu-item';

/**
 * It represents a specific menu item, about menu enemy
 */
class EnemyMenuItem extends MenuItem {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);        
    }
    
    //#region public methods   
    //#endregion
    
    //#region protected methods
    initialize(scene, name, position, properties) {
        super.initialize(scene, name, position, properties);
    
        this.enemy = this.scene.prefabs[properties.enemyName];
    }     

    /**
     * Selects one menu
     */
    select() {
        this.scene.currentAttack.hit(this.enemy);
        this.scene.activateEnemysMenu(false);

    }
    //#endregion
}

export default EnemyMenuItem;