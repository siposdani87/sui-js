import { Knot } from '../core';
import { Header } from './header';
/**
 * Dropdown menu rendered inside the application {@link Header}. Toggling
 * the menu also opens/closes the header's expanded state and manages
 * shadow styling.
 *
 * The toggle button is bound to the `#toggle-top-menu` element within the
 * header, and the menu container is `#top-menu`.
 *
 * @see {@link Header}
 * @category Module
 *
 * @example
 * const topMenu = new TopMenu(header);
 * topMenu.open();
 * const container = topMenu.getContainer();
 */
export declare class TopMenu {
    header: Header;
    topMenu: Knot;
    toggleTopMenu: Knot;
    /**
     * Creates a new TopMenu instance and binds the toggle click event
     * within the provided header.
     *
     * @param {Header} header - The application header instance that
     *     contains the top menu DOM elements.
     */
    constructor(header: Header);
    /**
     * Queries the top menu and toggle button elements and binds the
     * click handler.
     */
    private _init;
    /**
     * Toggles the top menu between its open and closed states.
     *
     * @example
     * topMenu.toggle();
     */
    toggle(): void;
    /**
     * Checks whether the top menu is currently visible.
     *
     * @returns {boolean} True if the menu is open, false otherwise.
     */
    isOpened(): boolean;
    /**
     * Opens the top menu by expanding the header, showing the menu
     * container, activating the toggle button, and displaying the
     * header shadow.
     *
     * @example
     * topMenu.open();
     */
    open(): void;
    /**
     * Closes the top menu by collapsing the header, hiding the menu
     * container, deactivating the toggle button, and removing the
     * header shadow.
     */
    close(): void;
    /**
     * Returns the menu container {@link Knot} where menu items should be
     * appended.
     *
     * @returns {Knot} The top menu container element.
     *
     * @example
     * const container = topMenu.getContainer();
     * container.appendChild(menuItemKnot);
     */
    getContainer(): Knot;
}
