import { Knot } from '../core';

const componentHandler = window['componentHandler'];

/**
 * @param {!Knot|!HTMLElement=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export const mdl = (
    opt_node?: Knot | HTMLElement,
    opt_forceDowngrade = true,
): void => {
    const element = opt_node instanceof Knot ? opt_node.getNode() : opt_node;

    if (opt_node) {
        if (opt_forceDowngrade) {
            componentHandler.downgradeElements(element);
        }
        componentHandler.upgradeElement(element);
    } else {
        componentHandler.upgradeDom();
    }
};
