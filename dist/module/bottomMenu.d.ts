import { Knot } from '../core';
import { Footer } from './footer';
/**
 * Popup menu rendered inside the application {@link Footer}. Toggling
 * the menu also opens/closes the footer's expanded state.
 *
 * The open and close buttons are bound to `#open-bottom-menu` and
 * `#close-bottom-menu` elements within the footer, and the menu
 * container is `#bottom-menu`.
 *
 * @see {@link Footer}
 * @category Module
 *
 * @example
 * const bottomMenu = new BottomMenu(footer);
 * bottomMenu.open();
 * const container = bottomMenu.getContainer();
 */
export declare class BottomMenu {
    footer: Footer;
    bottomMenu: Knot;
    /**
     * Creates a new BottomMenu instance and binds the toggle click events
     * within the provided footer.
     *
     * @param {Footer} footer - The application footer instance that
     *     contains the bottom menu DOM elements.
     */
    constructor(footer: Footer);
    /**
     * Queries the bottom menu container and binds click handlers for the
     * open and close buttons.
     */
    private _init;
    /**
     * Toggles the bottom menu between its open and closed states.
     *
     * @example
     * bottomMenu.toggle();
     */
    toggle(): void;
    /**
     * Checks whether the bottom menu is currently visible.
     *
     * @returns {boolean} True if the menu is open, false otherwise.
     */
    isOpened(): boolean;
    /**
     * Opens the bottom menu by making it visible and expanding the footer.
     *
     * @example
     * bottomMenu.open();
     */
    open(): void;
    /**
     * Closes the bottom menu by hiding it and collapsing the footer.
     */
    close(): void;
    /**
     * Returns the menu container {@link Knot} where menu items should be
     * appended.
     *
     * @returns {Knot} The bottom menu container element.
     *
     * @example
     * const container = bottomMenu.getContainer();
     * container.appendChild(menuItemKnot);
     */
    getContainer(): Knot;
}
