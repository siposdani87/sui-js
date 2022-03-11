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
     * @param {!HTMLElement|!Item=} opt_element
     */
    constructor(selector: string, opt_element?: HTMLElement | Item);
    /**
     * @export
     * @return {!Item}
     */
    getItem(): Item<T>;
}
