class UserInput {
    constructor(scene) {
        this.scene = scene;
        
        this.enabled = false;
    }
    
    set_input(user_input_data) {
        this.scene.input.keyboard.removeAllListeners('keydown');
        this.scene.input.keyboard.removeAllListeners('keyup');
        
        this.scene.input.keyboard.on('keydown', this.process_input, this);
        this.scene.input.keyboard.on('keyup', this.process_input, this);
        
        this.user_inputs = user_input_data;

        this.enabled = true; 
    }
    
    process_input(event) {
        if (this.enabled) {
            let user_input = this.user_inputs[event.type][event.key];
            if (user_input) {
                let context = undefined;
                let callback_data = user_input.callback.split(".");
                if (callback_data[0] === "scene") {
                    context = this.scene;
                } else {
                    context = this.scene.prefabs[callback_data[0]];
                }
                let method = context[callback_data[1]];
                method.apply(context, user_input.args);
            }
        }
    }
}

export default UserInput;