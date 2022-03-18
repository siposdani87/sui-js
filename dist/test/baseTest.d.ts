/**
 * @class
 */
export declare class BaseTest {
    /**
     * @public
     * @type {string}
     */
    name: string;
    /**
     * @param {string=} opt_name
     */
    constructor(opt_name?: string);
    /**
     * @return {void}
     */
    init(): void;
    /**
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showError(message: string, object: Object | string | number | boolean): void;
    /**
     * @param {string} message
     * @param {!Object} object
     * @return {undefined}
     */
    showLog(message: string, object: Object): void;
}
