/**
 * Scene that loads the game
 * After, it will load the loading scene
 */
class BootScene extends Phaser.Scene {
    

    constructor() {
        super({ key: 'BootScene' });

        this.levels = {
            title: {key: 'TitleScene', path: 'assets/levels/title_screen.json'},
            town: {key: 'WorldScene', path: 'assets/levels/town.json'},
            cave: {key: 'WorldScene', path: 'assets/levels/cave.json'},
            battle: {key: 'BattleScene', path: 'assets/levels/battle.json'}
        };
    }

    preload() {
        for (let name in this.levels) {
            let level = this.levels[name];
            this.load.json(name, level.path);
        }
    }

    create(data) {
        const levelData = this.cache.json.get(data.scene);

        this.scene.start('LoadingScene', {
            levelData: levelData,
            scene: this.levels[data.scene].key
        });
    }
}

export default BootScene;