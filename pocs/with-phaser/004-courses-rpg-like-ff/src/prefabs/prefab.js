class Prefab extends Phaser.GameObjects.Sprite {
    
    constructor(scene, name, position, properties) {
        super(scene, position.x, position.y, properties.textures, properties.frame);
   
        this.scene = scene;
        this.name = name;

        this.scene.add.existing(this);

        this.scene.groups[properties.group].add(this);

        if (properties.scale) {
            this.setScale(properties.scale.x, properties.scale.y);
        } 
        if (properties.anchor) {
            this.setOrigin(properties.anchor.x, properties.anchor.y);
        } 

        this.scene.prefabs[this.name] = this;
    }
}

export default Prefab;