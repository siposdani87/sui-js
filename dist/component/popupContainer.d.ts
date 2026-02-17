import { Knot } from '../core';
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
export declare class PopupContainer {
    selector: string;
    container: Knot;
    /**
     * @description Creates a new PopupContainer bound to a DOM container element.
     * @param {string} [opt_selector] - CSS selector for the container element.
     */
    constructor(opt_selector?: string | undefined);
    /**
     * @description Resolves the container DOM element from the selector.
     */
    private _init;
    /**
     * @description Lazily initializes the window-level popup collection if it does not exist.
     * @param {Function} type - The constructor type for the collection.
     */
    private _initCollection;
    /**
     * @description Registers a popup in the global collection.
     * @param {Function} type - The popup constructor type.
     * @param {Popup} popup - The popup instance to register.
     *
     * @example
     * container.push(Popup, popupInstance);
     */
    push(type: Function, popup: Popup): void;
    /**
     * @description Removes a popup from the global collection.
     * @param {Popup} popup - The popup instance to remove.
     *
     * @example
     * container.delete(popupInstance);
     */
    delete(popup: Popup): void;
    /**
     * @description Closes all currently open popups in the global collection.
     *
     * @example
     * container.closeAll();
     */
    closeAll(): void;
    /**
     * @description Sets the CSS position of a popup element within the container.
     * @param {Knot} popupKnot - The popup DOM element to position.
     *
     * @example
     * container.setPosition(popupKnot);
     */
    setPosition(popupKnot: Knot): void;
    /**
     * @description Resets all CSS positioning properties of a popup element to auto.
     * @param {Knot} popupKnot - The popup DOM element to reset.
     *
     * @example
     * container.clearPosition(popupKnot);
     */
    clearPosition(popupKnot: Knot): void;
}
