import { Collection } from './collection';
import { Item } from './item';
/**
 * @class
 * @export
 * @extends {Collection}
 * @template T
 */
export declare class Query<T extends HTMLElement = HTMLElement> extends Collection<Item<T>> {
    /**
     * @param {string} selector
     * @param {!Element|!Item=} opt_element
     */
    constructor(selector: any, opt_element?: any);
    /**
     * @export
     * @return {!Item}
     */
    getItem(): Item<T>;
}
