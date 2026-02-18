/**
 * @module render
 *
 * Material Design Lite rendering utilities.
 *
 * Provides a helper for triggering MDL component upgrades on DOM elements
 * so that dynamically inserted markup is properly enhanced.
 *
 * @category Utility
 */

import { Knot } from '../core';

const componentHandler = window['componentHandler'];

/**
 * Triggers a Material Design Lite component upgrade on a DOM element.
 *
 * If `opt_forceDowngrade` is `true` (the default), any existing MDL
 * components on the element are downgraded first, allowing clean
 * re-initialization. When `node` is falsy the entire DOM is upgraded
 * via `componentHandler.upgradeDom()`.
 *
 * Accepts either a {@link Knot} wrapper or a raw `HTMLElement`.
 *
 * @param node - The element to upgrade. Pass a {@link Knot} instance or
 *   a raw `HTMLElement`. If falsy, the entire document is upgraded.
 * @param opt_forceDowngrade - When `true`, downgrades existing MDL
 *   components before upgrading. Defaults to `true`.
 * @category Utility
 *
 * @example
 * // Upgrade a Knot element with forced downgrade
 * mdl(myKnot);
 *
 * @example
 * // Upgrade without downgrading first
 * mdl(myKnot, false);
 *
 * @example
 * // Upgrade the entire DOM
 * mdl(null);
 */
export const mdl = (
    node: Knot | HTMLElement,
    opt_forceDowngrade = true,
): void => {
    const element = node instanceof Knot ? node.getNode() : node;

    if (node) {
        if (opt_forceDowngrade) {
            componentHandler.downgradeElements(element);
        }
        componentHandler.upgradeElement(element);
    } else {
        componentHandler.upgradeDom();
    }
};
