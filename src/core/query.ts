import { instanceOf, isFunction } from '../utils/operation';
import { Collection } from './collection';
import { Knot } from './knot';

/**
 * @class
 * @extends {Collection}
 * @template T
 */
export class Query<T extends HTMLElement = HTMLElement> extends Collection<
    Knot<T>
> {
    /**
     * @param {string} selector
     * @param {!HTMLElement|!Knot=} opt_element
     */
    constructor(selector: string, opt_element?: HTMLElement | Knot) {
        let element = opt_element || (document as any as HTMLElement);
        if (instanceOf(element, Knot)) {
            element = (element as Knot).getNode();
        }

        const items = querySelector(selector, element as HTMLElement);
        super(items, Knot, {
            parent: null,
        });
    }
    /**
     * @return {!Knot}
     */
    getKnot(): Knot<T> {
        let firstKnot = this.get(0);
        if (!firstKnot) {
            firstKnot = new Knot(null);
        }
        return firstKnot;
    }

    /**
     * @return {Array<!Knot>}
     */
    getKnots(): Knot[] {
        return this.getItems();
    }
}

/**
 * @param {string} selector
 * @param {!HTMLElement} element
 * @return {!Array}
 */
const querySelector = (selector: string, element: HTMLElement): Array<any> => {
    let nodeList: any = [];
    if (
        selector.indexOf(' ') !== -1 ||
        selector.split('.').length - 1 > 1 ||
        (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) ||
        selector.indexOf('[') !== -1
    ) {
        nodeList = element.querySelectorAll(selector);
    } else if (selector.indexOf('#') === 0) {
        let docElement = element as any as Document;
        if (!isFunction(docElement.getElementById)) {
            docElement = document;
        }
        const node = docElement.getElementById(selector.replace('#', ''));
        nodeList.push(node);
    } else if (selector.indexOf('.') === 0) {
        nodeList = element.getElementsByClassName(selector.replace('.', ''));
    } else {
        nodeList = element.getElementsByTagName(selector);
    }
    const nodes = [];
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i]) {
            nodes.push(nodeList[i]);
        }
    }
    return nodes;
};
