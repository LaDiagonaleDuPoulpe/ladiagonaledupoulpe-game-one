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
        for (let prefab_name in this.level_data.prefabs) {
            let prefab_data = this.level_data.prefabs[prefab_name];
            if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
                let prefab = new this.prefab_classes[prefab_data.type](this, prefab_data.name, prefab_data.position, prefab_data.properties);
            }
        }
    }
}

export default JSONLevelScene;