import { Item } from "../core";
/**
 * @export
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
 * @export
 * @param {string} type
 * @param {!Object} props
 * @param {!Item} mountNode
 * @return {!Object}
 */
export const renderReact = (type, props, mountNode) => window['ReactDOM']['render'](window['React']['createElement'](window[type], props), mountNode.getNode());
/**
 * @export
 * @param {!Item} mountNode
 * @return {undefined}
 */
export const unmountReact = (mountNode) => {
    window['ReactDOM']['unmountComponentAtNode'](mountNode.getNode());
};
