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
     * @param {boolean} condition
     * @param {string} message
     * @param {!Object|string|number|boolean} object
     * @return {undefined}
     */
    showAssert(condition: boolean, message: string, object: Object | string | number | boolean): void;
}
