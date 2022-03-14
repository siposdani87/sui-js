import { consoleError, consoleInfo } from '../utils/log';

/**
 * @class
 */
export class BaseTest {
    /**
     * @public
     * @type {string}
     */
    name: string;
    /**
     * @param {string=} opt_name
     */
    constructor(opt_name?: string) {
        this.name = opt_name;
    }
    /**
     * @return {void}
     */
    init(): void {
        // empty function
    }
    /**
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showError(message: string, object: Object | string | number | boolean): void {
        consoleError(this.name + '.' + message, object);
    }
    /**
     * @param {string} message
     * @param {!Object} object
     * @return {undefined}
     */
    showLog(message: string, object: Object): void {
        consoleInfo(this.name + '.' + message, object);
    }
}
