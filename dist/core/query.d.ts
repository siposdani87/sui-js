import { Collection } from './collection';
import { Item } from './item';
/**
 * @class
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
     * @return {!Item}
     */
    getItem(): Item<T>;
}
