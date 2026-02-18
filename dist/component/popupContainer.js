import { Collection } from '../core/collection';
import { Query } from '../core/query';
/**
 * @description Global popup lifecycle manager that tracks all open popups via a window-level
 * collection. Handles positioning and bulk close operations.
 *
 * @example
 * const container = new PopupContainer();
 * container.closeAll();
 *
 * @see {@link Popup} for individual popup instances
 *
 * @category Component
 */
export class PopupContainer {
    /**
     * @description Creates a new PopupContainer bound to a DOM container element.
     * @param {string} [opt_selector] - CSS selector for the container element.
     */
    constructor(opt_selector = 'body') {
        this.selector = opt_selector;
        this._init();
    }
    /**
     * @description Resolves the container DOM element from the selector.
     */
    _init() {
        this.container = new Query(this.selector).getKnot();
    }
    /**
     * @description Lazily initializes the window-level popup collection if it does not exist.
     * @param {Function} type - The constructor type for the collection.
     */
    _initCollection(type) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window['popup_collection'] =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window['popup_collection'] || new Collection([], type);
    }
    /**
     * @description Registers a popup in the global collection.
     * @param {Function} type - The popup constructor type.
     * @param {Popup} popup - The popup instance to register.
     *
     * @example
     * container.push(Popup, popupInstance);
     */
    push(type, popup) {
        this._initCollection(type);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (window['popup_collection']) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window['popup_collection'].push(popup);
        }
    }
    /**
     * @description Removes a popup from the global collection.
     * @param {Popup} popup - The popup instance to remove.
     *
     * @example
     * container.delete(popupInstance);
     */
    delete(popup) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (window['popup_collection']) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window['popup_collection'].delete(popup);
        }
    }
    /**
     * @description Closes all currently open popups in the global collection.
     *
     * @example
     * container.closeAll();
     */
    closeAll() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (window['popup_collection']) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window['popup_collection'].each((popup) => {
                popup.close();
            });
        }
    }
    /**
     * @description Sets the CSS position of a popup element within the container.
     * @param {Knot} popupKnot - The popup DOM element to position.
     *
     * @example
     * container.setPosition(popupKnot);
     */
    setPosition(popupKnot) {
        // const containerKnot = this.container.getKnot();
        // const top = containerKnot.offsetHeight - containerKnot.scrollHeight;
        // const absoluteTop = top === 0 ? 'auto' : top + 'px';
        // let left = containerKnot.offsetWidth - containerKnot.scrollWidth;
        // let absoluteLeft = left === 0 ? 'auto' : left + 'px';
        popupKnot.setStyle({
            // 'top': 0, // absoluteTop,
            left: 0, // absoluteLeft
        });
    }
    /**
     * @description Resets all CSS positioning properties of a popup element to auto.
     * @param {Knot} popupKnot - The popup DOM element to reset.
     *
     * @example
     * container.clearPosition(popupKnot);
     */
    clearPosition(popupKnot) {
        popupKnot.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
