import UserInput from '../plugins/UserInput';

class JSONLevelScene extends Phaser.Scene {
    constructor(key) {
        super({
            key: key
        });
    }
    
    init (data) {
        this.level_data = data.level_data;
    }
    
    create () {        
        this.groups = {};
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.add.group();
        }, this);

        this.prefabs = {};
        for (var prefab_name in this.level_data.prefabs) {
            var prefab_data = this.level_data.prefabs[prefab_name];
            this.create_prefab(prefab_name, prefab_data);
        }
        
        if (this.level_data.user_input) {
            this.user_inputs = {};
            for (let user_input_key in this.level_data.user_input) {
                this.user_inputs[user_input_key] = this.cache.json.get(user_input_key);
            }

            this.user_input = new UserInput(this);
            this.user_input_data = this.cache.json.get(this.level_data.initial_user_input);
            this.user_input.set_input(this.user_input_data);
        }
    }

    create_prefab (prefab_name, prefab_data) {
        if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
            var prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
        }
        return prefab;
    }

    update () {
        for (let prefab_name in this.prefabs) {
            this.prefabs[prefab_name].update();
        }
    }
}

export default JSONLevelScene;
