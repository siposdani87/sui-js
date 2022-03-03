import { isFunction } from '../utils/operation';
import { Collection } from './collection';
import { Item } from './item';
/**
 * @class
 * @export
 * @extends {Collection}
 */
export class Query extends Collection {
    /**
     * @param {string} selector
     * @param {!Element|!Item=} opt_element
     */
    constructor(selector, opt_element) {
        let element = opt_element || document;
        if (isFunction(element.getNode)) {
            element = element.getNode();
        }
        const items = querySelector(selector, element);
        super(items, Item, {
            parent: null,
        });
    }
    /**
     * @export
     * @return {!Item}
     */
    getItem() {
        let firstNode = /** @type {!Item} */ this.get(0);
        if (!firstNode) {
            firstNode = new Item(null);
        }
        return firstNode;
    }
}
/**
 * @param {string} selector
 * @param {!Element|!Item} element
 * @return {!Array}
 */
const querySelector = (selector, element) => {
    let nodeList = [];
    if (selector.indexOf(' ') !== -1 ||
        selector.split('.').length - 1 > 1 ||
        (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) ||
        selector.indexOf('[') !== -1) {
        nodeList = element.querySelectorAll(selector);
    }
    else if (selector.indexOf('#') === 0) {
        if (!isFunction(element.getElementById)) {
            element = document;
        }
        const node = element.getElementById(selector.replace('#', ''));
        nodeList.push(node);
    }
    else if (selector.indexOf('.') === 0) {
        nodeList = element.getElementsByClassName(selector.replace('.', ''));
    }
    else {
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
