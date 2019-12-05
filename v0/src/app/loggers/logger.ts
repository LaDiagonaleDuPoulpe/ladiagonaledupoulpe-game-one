import { injectable } from "tsyringe";

import { environment } from '../environments/environment';
/**
* Logger to log information in console, in api web, ...
*/
@injectable()
export class Logger {
    /**
    * Basic log with message and object
    */
    log(message: string, object: any) {
        if (! environment.production) {
            console.log(message, object); 
        }
    }
}