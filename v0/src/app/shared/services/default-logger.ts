import { environment } from "../../environments/environment";

/**
 * Default logger class to log info, error
 */
export class DefaultLogger {
    /**
     * Logs information in console
     * @param message message to puts on console
     * @param object  object to parse on console
     */
    log(message: string, object?: any) {
        if (! environment.production) {
            console.log(message, object);
        }
    }
}