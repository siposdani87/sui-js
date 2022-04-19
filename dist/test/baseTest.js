import { consoleAssert } from '../utils/log';
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
    init() {
        // empty function
    }
    /**
     * @param {boolean} condition
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showAssert(condition, message, object) {
        consoleAssert(condition, this.name + '.' + message, object);
    }
}
