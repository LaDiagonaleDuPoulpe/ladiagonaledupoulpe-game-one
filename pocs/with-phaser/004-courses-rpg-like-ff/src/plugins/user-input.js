class UserInput {
    constructor(scene) {
        this.scene = scene;

        this.enabled = false;
        this.keyListeners = ['down', 'up'];
    }

    //#region public methods
    /**
     * attach on input press key
     * @param {*} data json data
     */
    setInput(data) {
        this.keyListeners.forEach(item => {
            const key = 'key' + item;
            this.scene.input.keyboard.removeAllListeners(key);
            this.scene.input.keyboard.on(key, this.processInput, this);
        });
        
        this.userData = data;
        this.enabled = true; 
    }
    //#endregion
    
    //#region internal methods
    /**
     * Keyboard event process
     * @param {*} event key event
     */
    processInput(event) {
        if (this.enabled) {
            const input = this.userData[event.type][event.key];
            if (input) {
                const callbackArray = input.callback.split('.');

                const context = this.getContext(callbackArray);
                const callingMethod = this.getCallingMethod(context, callbackArray);

                callingMethod.apply(context, input.args);
            }
        }
    }

    /**
     * Gets calling method from json file and event key
     * @param {*} context 
     * @param {string[]} callbackArray 
     */
    getCallingMethod(context, callbackArray) {
        const methodName = callbackArray[1];

        return context[methodName];
    }

    /**
     * Gets callback array, with context name and callback method
     * @param {string[]} callbackArray 
     */
    getContext(callbackArray) {
        let context = undefined;

        const callingObject = callbackArray[0];

        if (callingObject === 'scene') {
            context = this.scene;
        } else {
            context = this.scene.prefabs[callingObject];
        }

        return context;
    }
    //#endregion
}

export default UserInput;