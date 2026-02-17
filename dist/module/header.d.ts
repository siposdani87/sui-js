import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * Application header bar that manages branding (logo image, title, URL),
 * visibility, shadow styling, and navigation button toggles for the
 * left menu and top menu.
 *
 * The header is bound to the `#header` DOM element and adjusts padding
 * on the main container and template view when shown or hidden.
 *
 * @see {@link TopMenu}
 * @see {@link LeftMenu}
 * @category Module
 *
 * @example
 * const header = new Header();
 * header.setTitle('My Application');
 * header.setImage('/assets/logo.png');
 * header.show();
 */
export declare class Header {
    options: Objekt;
    headerKnot: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandKnot: Knot;
    brandKnotImage: Knot;
    brandKnotTitle: Knot;
    mainContainerKnot: Knot;
    templateViewKnot: Knot;
    /**
     * Creates a new Header instance, queries the header DOM elements,
     * and binds the logo click event.
     *
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults.
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    private _setOptions;
    /**
     * Queries all header-related DOM elements and binds the logo click
     * event handler.
     */
    private _init;
    /**
     * Overridable hook called when the logo/brand element is clicked.
     * The default implementation logs a debug message; override this
     * method to implement custom navigation behavior.
     *
     * @example
     * header.eventLogoClick = () => {
     *     router.navigate('/home');
     * };
     */
    eventLogoClick(): void;
    /**
     * Sets the application title text displayed in the header brand area.
     *
     * @param {string} title - The title HTML or text to display.
     *
     * @example
     * header.setTitle('Dashboard');
     */
    setTitle(title: string): void;
    /**
     * Sets the URL that the brand/logo element links to.
     *
     * @param {string} url - The target URL for the brand link.
     *
     * @example
     * header.setUrl('/home');
     */
    setUrl(url: string): void;
    /**
     * Sets the logo image source displayed in the header brand area.
     *
     * @param {string} imagePath - The path or URL to the logo image.
     *
     * @example
     * header.setImage('/assets/logo.svg');
     */
    setImage(imagePath: string): void;
    /**
     * Expands the header to its open/extended state by adding the
     * 'open' CSS class.
     */
    open(): void;
    /**
     * Collapses the header from its open/extended state by removing the
     * 'open' CSS class.
     */
    close(): void;
    /**
     * Shows the header and applies appropriate padding to the main
     * container and template view so content does not overlap.
     *
     * @example
     * header.show();
     */
    show(): void;
    /**
     * Hides the header and removes padding adjustments from the main
     * container and template view.
     *
     * @example
     * header.hide();
     */
    hide(): void;
    /**
     * Adds a drop shadow beneath the header.
     */
    showShadow(): void;
    /**
     * Removes the drop shadow from the header.
     */
    hideShadow(): void;
    /**
     * Shows the left menu navigation button (hamburger icon) in the header.
     */
    showLeftMenuButton(): void;
    /**
     * Hides the left menu navigation button from the header.
     */
    hideLeftMenuButton(): void;
    /**
     * Shows the top menu toggle button in the header.
     */
    showTopMenuButton(): void;
    /**
     * Hides the top menu toggle button from the header.
     */
    hideTopMenuButton(): void;
}
