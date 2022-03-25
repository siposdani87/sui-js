import { Item } from '../core';
/**
 * @param {!Item|!Element=} opt_node
 * @param {boolean=} opt_forceDowngrade
 * @return {undefined}
 */
export const mdl = (opt_node, opt_forceDowngrade = true) => {
    let element = opt_node || document;
    if (element instanceof Item) {
        element = element.getNode();
    }
    if (opt_node) {
        if (opt_forceDowngrade) {
            window['componentHandler']['downgradeElements'](element);
        }
        window['componentHandler']['upgradeElement'](element);
    }
    else {
        window['componentHandler']['upgradeDom']();
    }
};
/**
 * @param {ClassRef} classRef
 * @param {!Object} props
 * @param {!Item} mountNode
 * @return {!Object}
 */
export const renderReact = (classRef, props, mountNode) => window['ReactDOM']['render'](window['React']['createElement'](classRef, props), mountNode.getNode());
/**
 * @param {!Item} mountNode
 * @return {undefined}
 */
export const unmountReact = (mountNode) => {
    window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};
