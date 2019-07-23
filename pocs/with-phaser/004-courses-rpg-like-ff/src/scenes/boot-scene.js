class BootScene extends Phaser.Scene {
    

    constructor() {
        super({ key: 'BootScene' });

        this.levels = {
            title: {key: 'TitleScene', path: 'assets/levels/title_screen.json'}
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
        console.log('data', levelData);
        this.scene.start('LoadingScene', {
            levelData: levelData
        });
    }
}

export default BootScene;