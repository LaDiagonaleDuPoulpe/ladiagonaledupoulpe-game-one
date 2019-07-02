import * as tslib_1 from "tslib";
var TestScene = /** @class */ (function (_super) {
    tslib_1.__extends(TestScene, _super);
    function TestScene() {
        return _super.call(this, {
            key: 'TestScene'
        }) || this;
    }
    TestScene.prototype.preload = function () {
        this.load.tilemapTiledJSON('map', '/assets/tilemaps/desert.json');
        this.load.image('Desert', '/assets/tilemaps/tmw_desert_spacing.png');
        this.load.image('player', '/assets/sprites/mushroom.png');
    };
    TestScene.prototype.create = function () {
        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('Desert');
        var layer = map.createStaticLayer(0, tileset, 0, 0);
        this.player = this.add.sprite(100, 100, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, false);
    };
    TestScene.prototype.update = function (time, delta) {
        this.player.angle += 1;
        if (this.cursors.left.isDown) {
            this.player.x -= 5;
        }
        if (this.cursors.right.isDown) {
            this.player.x += 5;
        }
        if (this.cursors.down.isDown) {
            this.player.y += 5;
        }
        if (this.cursors.up.isDown) {
            this.player.y -= 5;
        }
    };
    return TestScene;
}(Phaser.Scene));
export default TestScene;
//# sourceMappingURL=play-scene.js.map