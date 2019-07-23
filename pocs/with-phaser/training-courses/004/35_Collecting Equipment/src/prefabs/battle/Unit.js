import Prefab from '../Prefab';

class Unit extends Prefab {
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        if (!this.scene.anims.anims.has(name + '_idle')) {
            this.scene.anims.create({
                key: name + '_idle', 
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: properties.animations.idle.frames}),
                frameRate: properties.animations.idle.fps,
                repeat: -1
            });
        }
        
        if (!this.scene.anims.anims.has(name + '_attack1')) {
            this.scene.anims.create({
                key: name + '_attack1', 
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: properties.animations.attack1.frames}),
                frameRate: properties.animations.idle.fps
            });
        }
        
        if (!this.scene.anims.anims.has(name + '_attack2')) {
            this.scene.anims.create({
                key: name + '_attack2', 
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: properties.animations.attack2.frames}),
                frameRate: properties.animations.idle.fps
            });
        }
        
        if (!this.scene.anims.anims.has(name + '_hit')) {
            this.scene.anims.create({
                key: name + '_hit', 
                frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: properties.animations.hit.frames}),
                frameRate: properties.animations.idle.fps
            });
        }

        this.on('animationcomplete', this.back_to_idle.bind(this));
        
        this.anims.play(name + '_idle');
        
        this.stats = properties.stats;
    }
    
    back_to_idle (animation) {
        this.anims.play(this.name + '_idle');
        if (animation.key == this.name + '_attack1' || animation.key == this.name + '_attack2') {
            this.scene.next_turn();
        }
    }

    receive_damage (damage) {
        let damage_text = this.scene.add.text(this.x, this.y - 50, "" + damage, {font: "bold 24px Kells", fill: "#FF0000"}, this.scene.groups.hud);
        this.timed_event = this.scene.time.addEvent({ delay: 1000, callback: damage_text.destroy, callbackScope: damage_text });

        this.stats.health -= damage;
        this.anims.play(this.name + "_hit");
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.destroy();
        }
    }

    calculate_act_turn (current_turn) {
        this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
    };

}

export default Unit;
