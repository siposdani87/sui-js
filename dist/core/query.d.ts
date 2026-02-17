import { Collection } from './collection';
import { Knot } from './knot';
/**
 * A DOM query result collection that selects elements matching a CSS selector
 * and wraps them as {@link Knot} instances within a {@link Collection}.
 *
 * Query uses an optimized {@link querySelector} helper that dispatches to the
 * fastest native DOM method available for the given selector string:
 * `getElementById`, `getElementsByClassName`, `getElementsByTagName`, or
 * `querySelectorAll` for complex selectors.
 *
 * @example
 * // Select all list items inside a container
 * const items = new Query<HTMLLIElement>('ul.menu li');
 * const firstItem = items.getKnot();
 *
 * // Select within a specific parent element
 * const container = new Knot<HTMLDivElement>('.sidebar');
 * const links = new Query<HTMLAnchorElement>('a', container);
 * const allLinks = links.getKnots();
 *
 * @see {@link Collection}
 * @see {@link Knot}
 * @category Core
 */
export declare class Query<T extends HTMLElement = HTMLElement> extends Collection<Knot<T>> {
    /**
     * Creates a new Query by selecting DOM elements matching the given CSS
     * selector and wrapping each result in a {@link Knot}.
     *
     * @param selector CSS selector string used to find matching elements.
     * @param opt_element Parent element or {@link Knot} to scope the query
     *     within. Defaults to the document root when omitted.
     */
    constructor(selector: string, opt_element?: HTMLElement | Knot);
    /**
     * Returns the first matched element as a {@link Knot}. If the query
     * matched no elements, returns an empty Knot (wrapping `null`).
     *
     * @returns The first matched DOM element wrapped in a {@link Knot}, or
     *     an empty Knot if no elements matched.
     * @example
     * const header = new Query<HTMLHeadingElement>('h1').getKnot();
     * console.log(header.getNode().textContent);
     */
    getKnot(): Knot<T>;
    /**
     * Returns all matched elements as an array of {@link Knot} instances.
     *
     * @returns An array of all matched DOM elements, each wrapped in a
     *     {@link Knot}.
     * @example
     * const buttons = new Query<HTMLButtonElement>('button').getKnots();
     * buttons.forEach((knot) => knot.addClass('styled'));
     */
    getKnots(): Knot[];
}
