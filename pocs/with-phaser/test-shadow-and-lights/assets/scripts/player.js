class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(cursors, scene, x, y) {
        super(scene, x, y, 'character_sheet_all');
        this.cursors = cursors;

        scene.add.existing(this);
    }

    preload() {
        this.scene.load.setPath('assets/images/Octo2 PNGs');
        this.scene.load.multiatlas('character_sheet_all', 'octo3 all/octo3-all.json');
    }
    
    create() {
        this.setScale(0.2);
        
        this.setPipeline('Light2D');
        
        this.scene.physics.world.enable(this);
        
        var frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 down all_', suffix: '.png', start: 0, end: 15 });
        this.scene.anims.create({ key: 'idle-down', frames: frameNames, frameRate: 15, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 down all_', suffix: '.png', start: 45, end: 65 });
        this.scene.anims.create({ key: 'walk-down', frames: frameNames, frameRate: 25, repeat: -1 });        
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 left all_', suffix: '.png', start: 0, end: 15 });
        this.scene.anims.create({ key: 'idle-left', frames: frameNames, frameRate: 15, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 left all_', suffix: '.png', start: 45, end: 69 });
        this.scene.anims.create({ key: 'walk-left', frames: frameNames, frameRate: 25, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 right all_', suffix: '.png', start: 0, end: 15 });
        this.scene.anims.create({ key: 'idle-right', frames: frameNames, frameRate: 15, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 right all_', suffix: '.png', start: 45, end: 69 });
        this.scene.anims.create({ key: 'walk-right', frames: frameNames, frameRate: 25, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 up all_', suffix: '.png', start: 0, end: 15 });
        this.scene.anims.create({ key: 'idle-top', frames: frameNames, frameRate: 15, repeat: -1 });
        
        frameNames = this.scene.anims.generateFrameNames('character_sheet_all', { zeroPad: 3, prefix: 'octo3 up all_', suffix: '.png', start: 45, end: 69 });
        this.scene.anims.create({ key: 'walk-top', frames: frameNames, frameRate: 25, repeat: -1 });
        
        this.anims.play('idle-down');
    }

    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            
            this.anims.play('walk-left', true);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            
            this.anims.play('walk-right', true);
        }
        else if (this.cursors.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-160);
            
            this.anims.play('walk-top', true);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(160);
            
            this.anims.play('walk-down', true);
        }
        else {
    
            const currentAnimationKey = this.anims.currentAnim.key;
            const parts = currentAnimationKey.split('-');
    
            this.setVelocityX(0);
            this.setVelocityY(0);
            console.log('stop');
            
            this.anims.play('idle' + '-' + parts[1]);
        }
    }
}