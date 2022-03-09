import { consoleError, consoleInfo } from '../utils/log';
/**
 * @class
 */
export class BaseTest {
    /**
     * @param {string=} opt_name
     */
    constructor(opt_name) {
        this.name = opt_name;
    }
    /**
     * @return {void}
     */
    init() { }
    /**
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showError(message, object) {
        consoleError(this.name + '.' + message, object);
    }
    /**
     * @param {string} message
     * @param {!Object} object
     * @return {undefined}
     */
    showLog(message, object) {
        consoleInfo(this.name + '.' + message, object);
    }
}