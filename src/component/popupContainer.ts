import type { Knot } from '../core';
import { Collection } from '../core/collection';
import { Query } from '../core/query';
import type { Popup } from './popup';
import type { ClassRef } from '../utils/types';

/**
 * Global popup lifecycle manager that tracks all open popups via a window-level
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
     * Creates a new PopupContainer bound to a DOM container element.
     * @param {string} [opt_selector] - CSS selector for the container element.
     */
    constructor(opt_selector: string | undefined = 'body') {
        this.selector = opt_selector;
        this._init();
    }

    /**
     * Resolves the container DOM element from the selector.
     */
    private _init(): void {
        this.container = new Query(this.selector).getKnot();
    }

    /**
     * Returns the window-level popup collection.
     */
    private _getGlobalCollection(): Collection<Popup> | undefined {
        return (window as unknown as Record<string, unknown>)[
            'popup_collection'
        ] as Collection<Popup> | undefined;
    }

    /**
     * Sets the window-level popup collection.
     */
    private _setGlobalCollection(collection: Collection<Popup>): void {
        (window as unknown as Record<string, unknown>)['popup_collection'] =
            collection;
    }

    /**
     * Lazily initializes the window-level popup collection if it does not exist.
     * @param {Function} type - The constructor type for the collection.
     */
    private _initCollection(type: ClassRef): void {
        if (!this._getGlobalCollection()) {
            this._setGlobalCollection(new Collection([], type));
        }
    }

    /**
     * Registers a popup in the global collection.
     * @param {Function} type - The popup constructor type.
     * @param {Popup} popup - The popup instance to register.
     *
     * @example
     * container.push(Popup, popupInstance);
     */
    push(type: ClassRef, popup: Popup): void {
        this._initCollection(type);
        this._getGlobalCollection()?.push(popup);
    }

    /**
     * Removes a popup from the global collection.
     * @param {Popup} popup - The popup instance to remove.
     *
     * @example
     * container.delete(popupInstance);
     */
    delete(popup: Popup): void {
        this._getGlobalCollection()?.delete(popup);
    }

    /**
     * Closes all currently open popups in the global collection.
     *
     * @example
     * container.closeAll();
     */
    closeAll(): void {
        this._getGlobalCollection()?.each((popup: Popup) => {
            popup.close();
        });
    }

    /**
     * Sets the CSS position of a popup element within the container.
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
     * Resets all CSS positioning properties of a popup element to auto.
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
