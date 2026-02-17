import { Knot } from '../core';
/**
 * Slide-out left sidebar navigation with a main menu panel and a
 * secondary sub-menu panel. Opening the menu applies a blur overlay
 * to the main content and prevents body scrolling.
 *
 * The main menu and sub-menu each have their own title and scrollable
 * container. Use {@link openSubMenu} to switch from the main panel to
 * the sub-menu panel, and {@link closeSubMenu} to return.
 *
 * @see {@link Header}
 * @see {@link TopMenu}
 * @category Module
 *
 * @example
 * const leftMenu = new LeftMenu();
 * leftMenu.open('Navigation');
 * const container = leftMenu.getMainContainer();
 */
export declare class LeftMenu {
    body: Knot;
    mainContainerKnot: Knot;
    leftMenu: Knot;
    mainMenu: Knot;
    subMenu: Knot;
    mainMenuContainer: Knot;
    subMenuContainer: Knot;
    mainMenuTitle: Knot;
    subMenuTitle: Knot;
    /**
     * Creates a new LeftMenu instance, queries the menu DOM elements,
     * and binds open/close event handlers.
     */
    constructor();
    /**
     * Queries all left menu DOM elements including main and sub-menu
     * panels, containers, and titles.
     */
    private _init;
    /**
     * Binds click handlers for opening, closing, and navigating between
     * the main menu and sub-menu panels.
     */
    private _initEvents;
    /**
     * Opens the left menu sidebar with a blur overlay on the main content.
     * Prevents body scrolling while the menu is visible.
     *
     * @param {string | undefined} opt_title - Optional title displayed at
     *     the top of the main menu panel.
     *
     * @example
     * leftMenu.open('Main Navigation');
     */
    open(opt_title?: string | undefined): void;
    /**
     * Closes the left menu sidebar, removes the blur overlay, and
     * restores body scrolling.
     */
    close(): void;
    /**
     * Switches the left menu view from the main menu panel to the
     * sub-menu panel.
     *
     * @param {string | undefined} opt_title - Optional title displayed at
     *     the top of the sub-menu panel.
     *
     * @example
     * leftMenu.openSubMenu('Settings');
     */
    openSubMenu(opt_title?: string | undefined): void;
    /**
     * Returns the left menu view from the sub-menu panel back to the
     * main menu panel.
     */
    closeSubMenu(): void;
    /**
     * Returns the main menu container {@link Knot} where primary menu
     * items should be appended.
     *
     * @returns {Knot} The main menu container element.
     *
     * @example
     * const mainContainer = leftMenu.getMainContainer();
     */
    getMainContainer(): Knot;
    /**
     * Returns the sub-menu container {@link Knot} where secondary menu
     * items should be appended.
     *
     * @returns {Knot} The sub-menu container element.
     *
     * @example
     * const subContainer = leftMenu.getSubContainer();
     */
    getSubContainer(): Knot;
}
