import { Knot } from '../core/knot';
import { PopupContainer } from './popupContainer';
/**
 * @description Toggleable popup overlay that attaches content to a parent element.
 * Supports optional close button and integrates with the global {@link PopupContainer}
 * for lifecycle management.
 *
 * @example
 * const popup = new Popup(contentKnot, parentKnot, true);
 * popup.eventClose = () => console.log('Popup closed');
 * popup.toggle();
 *
 * @see {@link PopupContainer} for global popup lifecycle management
 *
 * @category Component
 */
export declare class Popup {
    content: Knot;
    parent?: Knot;
    withClose: boolean;
    popupContainer: PopupContainer;
    popupKnot: Knot;
    /**
     * @description Creates a new Popup with content attached to a parent element.
     * @param {Knot} content - The content to display inside the popup.
     * @param {Knot} parent - The parent element the popup is attached to.
     * @param {boolean} [opt_withClose] - Whether to show a close button.
     */
    constructor(content: Knot, parent: Knot, opt_withClose?: boolean | undefined);
    /**
     * @description Initializes the popup container and draws the popup DOM.
     */
    private _init;
    /**
     * @description Creates the popup DOM structure and appends it to the parent element.
     */
    private _draw;
    /**
     * @description Adds an MDL close button to the popup when withClose is enabled.
     */
    private _initCloseButton;
    /**
     * @description Opens the popup, closing all other popups first, and positions it within the container.
     *
     * @example
     * popup.open();
     */
    open(): void;
    /**
     * @description Closes the popup, removes it from the container, and fires the eventClose callback.
     *
     * @example
     * popup.close();
     */
    close(): void;
    /**
     * @description Called when the popup is closed. Override to handle close events.
     *
     * @example
     * popup.eventClose = () => cleanup();
     */
    eventClose(): void;
    /**
     * @description Toggles the popup between open and closed states.
     *
     * @example
     * button.addEventListener('click', () => popup.toggle());
     */
    toggle(): void;
    /**
     * @description Checks whether the popup is currently open.
     * @returns {boolean} True if the popup is visible.
     *
     * @example
     * if (popup.isOpened()) { popup.close(); }
     */
    isOpened(): boolean;
}
