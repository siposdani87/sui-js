import { Knot } from '../core';
/**
 * Navigation bar component for secondary navigation such as breadcrumbs
 * or contextual links. Supports toggling between expanded and collapsed
 * states, visibility control, shadow styling, and provides access to its
 * container for appending navigation items.
 *
 * The component binds to the `.nav-bar-header` DOM element and the
 * `#nav-bar` container within it. A toggle button (`#toggle-nav-bar`)
 * switches between expand (menu icon) and collapse (close icon) states.
 *
 * @see {@link Header}
 * @category Module
 *
 * @example
 * const navBar = new NavBar();
 * navBar.show();
 * navBar.open();
 * const container = navBar.getContainer();
 */
export declare class NavBar {
    navBarHeader: Knot;
    navBar: Knot;
    toggleNavBarIcon: Knot;
    /**
     * Creates a new NavBar instance, queries the navigation bar DOM
     * elements, and binds the toggle click event.
     */
    constructor();
    /**
     * Queries the nav bar header, nav bar container, and toggle button,
     * then binds the toggle click handler.
     */
    private _init;
    /**
     * Toggles the navigation bar between its expanded and collapsed states.
     *
     * @example
     * navBar.toggle();
     */
    toggle(): void;
    /**
     * Checks whether the navigation bar is currently in its expanded state.
     *
     * @returns {boolean} True if the nav bar is open, false otherwise.
     */
    isOpened(): boolean;
    /**
     * Expands the navigation bar and changes the toggle icon to 'close'.
     *
     * @example
     * navBar.open();
     */
    open(): void;
    /**
     * Collapses the navigation bar and changes the toggle icon to 'menu'.
     */
    close(): void;
    /**
     * Shows the navigation bar header by removing the 'hidden' class.
     *
     * @example
     * navBar.show();
     */
    show(): void;
    /**
     * Hides the navigation bar header by adding the 'hidden' class.
     */
    hide(): void;
    /**
     * Adds a drop shadow beneath the navigation bar.
     */
    showShadow(): void;
    /**
     * Removes the drop shadow from the navigation bar.
     */
    hideShadow(): void;
    /**
     * Returns the navigation bar container {@link Knot} where navigation
     * items should be appended.
     *
     * @returns {Knot} The nav bar container element.
     *
     * @example
     * const container = navBar.getContainer();
     * container.appendChild(breadcrumbKnot);
     */
    getContainer(): Knot;
}
