class TextPrefab extends Phaser.GameObjects.Text {
    
    constructor(scene, name, position, properties) {
        super(scene, position.x, position.y, properties.text, properties.style);
   
        // TODO: doing better => prefab and text-prefab got the same code in constructor
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

export default TextPrefab;