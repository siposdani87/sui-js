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
    constructor(opt_name?: string | undefined);
    /**
     * @return {void}
     */
    init(): void;
    /**
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showError(message: any, object: any): void;
    /**
     * @param {string} message
     * @param {!Object} object
     * @return {undefined}
     */
    showLog(message: any, object: any): void;
}
