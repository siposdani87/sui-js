import { Knot } from '../core';
const componentHandler = window['componentHandler'];
export const mdl = (opt_node, opt_forceDowngrade = true) => {
    const element = opt_node instanceof Knot ? opt_node.getNode() : opt_node;
    if (opt_node) {
        if (opt_forceDowngrade) {
            componentHandler.downgradeElements(element);
        }
        componentHandler.upgradeElement(element);
    }
    else {
        componentHandler.upgradeDom();
    }
};
