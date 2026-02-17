import { Knot } from '../core';
import { Collection } from '../core/collection';
import { Query } from '../core/query';
import { Popup } from './popup';

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
    selector: string;
    container!: Knot;

    /**
     * @description Creates a new PopupContainer bound to a DOM container element.
     * @param {string} [opt_selector] - CSS selector for the container element.
     */
    constructor(opt_selector: string | undefined = 'body') {
        this.selector = opt_selector;
        this._init();
    }

    /**
     * @description Resolves the container DOM element from the selector.
     */
    private _init(): void {
        this.container = new Query(this.selector).getKnot();
    }

    /**
     * @description Lazily initializes the window-level popup collection if it does not exist.
     * @param {Function} type - The constructor type for the collection.
     */
    private _initCollection(type: Function): void {
        (window as any)['popup_collection'] =
            (window as any)['popup_collection'] || new Collection([], type);
    }

    /**
     * @description Registers a popup in the global collection.
     * @param {Function} type - The popup constructor type.
     * @param {Popup} popup - The popup instance to register.
     *
     * @example
     * container.push(Popup, popupInstance);
     */
    push(type: Function, popup: Popup): void {
        this._initCollection(type);
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].push(popup);
        }
    }

    /**
     * @description Removes a popup from the global collection.
     * @param {Popup} popup - The popup instance to remove.
     *
     * @example
     * container.delete(popupInstance);
     */
    delete(popup: Popup): void {
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].delete(popup);
        }
    }

    /**
     * @description Closes all currently open popups in the global collection.
     *
     * @example
     * container.closeAll();
     */
    closeAll(): void {
        if ((window as any)['popup_collection']) {
            (window as any)['popup_collection'].each((popup: Popup) => {
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
    setPosition(popupKnot: Knot): void {
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
    clearPosition(popupKnot: Knot): void {
        popupKnot.setStyle({
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
        });
    }
}
