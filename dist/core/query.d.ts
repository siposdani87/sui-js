import { Collection } from './collection';
/**
 * @class
 * @export
 * @extends {Collection}
 */
export declare class Query extends Collection {
    /**
     * @param {string} selector
     * @param {!Element|!Item=} opt_element
     */
    constructor(selector: any, opt_element?: any);
    /**
     * @export
     * @return {!Item}
     */
    getItem(): any;
}
