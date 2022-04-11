import { Item } from '../core';
// import { componentHandler } from 'material-design-lite';

const componentHandler = window['componentHandler'];

/**
 * @param {!Item|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export const mdl = (
    opt_node?: Item | Element,
    opt_forceDowngrade: boolean | undefined = true,
): void => {
    let element = opt_node || document;
    if (element instanceof Item) {
        element = element.getNode();
    }
    if (opt_node) {
        if (opt_forceDowngrade) {
            componentHandler.downgradeElements(element);
        }
        componentHandler.upgradeElement(element);
    } else {
        componentHandler.upgradeDom();
    }
};
