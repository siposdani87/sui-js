import { instanceOf, isFunction } from '../utils/operation';
import { Collection } from './collection';
import { Knot } from './knot';
export class Query extends Collection {
    constructor(selector, opt_element) {
        let element = opt_element || document;
        if (instanceOf(element, Knot)) {
            element = element.getNode();
        }
        const items = querySelector(selector, element);
        super(items, Knot, {
            parent: null,
        });
    }
    getKnot() {
        let firstKnot = this.get(0);
        if (!firstKnot) {
            firstKnot = new Knot(null);
        }
        return firstKnot;
    }
    getKnots() {
        return this.getItems();
    }
}
const querySelector = (selector, element) => {
    let nodeList = [];
    if (selector.indexOf(' ') !== -1 ||
        selector.split('.').length - 1 > 1 ||
        (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) ||
        selector.indexOf('[') !== -1) {
        nodeList = element.querySelectorAll(selector);
    }
    else if (selector.indexOf('#') === 0) {
        let docElement = element;
        if (!isFunction(docElement.getElementById)) {
            docElement = document;
        }
        const node = docElement.getElementById(selector.replace('#', ''));
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
