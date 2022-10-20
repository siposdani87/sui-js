import { Collection } from './collection';
import { Knot } from './knot';
/**
 * @class
 * @extends {Collection}
 * @template T
 */
export declare class Query<T extends HTMLElement = HTMLElement> extends Collection<Knot<T>> {
    /**
     * @param {string} selector
     * @param {!HTMLElement|!Knot=} opt_element
     */
    constructor(selector: string, opt_element?: HTMLElement | Knot);
    /**
     * @return {!Knot}
     */
    getKnot(): Knot<T>;
}
