import { Knot } from '../core';
const componentHandler = window['componentHandler'];
export const mdl = (node, opt_forceDowngrade = true) => {
    const element = node instanceof Knot ? node.getNode() : node;
    if (node) {
        if (opt_forceDowngrade) {
            componentHandler.downgradeElements(element);
        }
        componentHandler.upgradeElement(element);
    }
    else {
        componentHandler.upgradeDom();
    }
};
