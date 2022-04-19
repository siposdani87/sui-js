import { consoleAssert } from '../utils/log';

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
     * @param {boolean} condition
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showAssert(
        condition: boolean,
        message: string,
        object: Object | string | number | boolean,
    ): void {
        consoleAssert(condition, this.name + '.' + message, object);
    }
}
