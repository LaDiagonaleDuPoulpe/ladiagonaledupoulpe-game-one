class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        
        this.levels = {
            title: {key: 'TitleScene', path: 'assets/levels/title_screen.json'}, 
            town: {key: 'WorldScene', path: 'assets/levels/town.json'}, 
            cave: {key: 'WorldScene', path:'assets/levels/cave.json'},
            battle: {key: 'BattleScene', path: 'assets/levels/battle.json'},
            pause: {key: 'PauseScene', path: 'assets/levels/pause_screen.json'}
        };
    }
    
    preload () {
        for (let level_name in this.levels) {
            let level = this.levels[level_name];
            this.load.json(level_name, level.path);
        }
    }
    
    create (data) {
        let scene = '';
        let extra_parameters = {};
        if (!data) {
            scene = 'title';
        } else {
            scene = data.scene;
            extra_parameters = data.extra_parameters;
        }
        let level_data = this.cache.json.get(scene);
        this.scene.start('LoadingScene', {level_data: level_data, scene: this.levels[scene].key, extra_parameters: extra_parameters});
    }
}

export default BootScene;
