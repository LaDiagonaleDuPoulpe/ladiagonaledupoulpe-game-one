import Prefab from '../Prefab';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

class Equipment extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        this.setScale(0.3, 0.3);
        
        this.unit_name = properties.unit_name;
        this.body_part = properties.body_part;
        this.stat = properties.stat;
        this.bonus = +properties.bonus;
        
        this.texture_name = properties.texture;
        
        this.body.immovable = true;
        this.body.setSize(this.width * this.scaleX, this.height * this.scaleY);
        
        this.scene.physics.add.collider(this, this.scene.groups.players, this.collect, null, this);
    }
    
    collect() {
        let unit_data = this.scene.cache.game.party_data[this.unit_name];
        
        if (unit_data.equipment[this.body_part].name !== this.name) {
            unit_data.equipment[this.body_part] = {name: this.name, texture: this.texture_name};
            unit_data.stats_bonus[this.stat] = this.bonus;
            
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/party_data').set(this.scene.cache.game.party_data);
            
            this.destroy();
        }
    }
}

export default Equipment;