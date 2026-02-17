import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * Application footer bar that manages visibility, content injection, locale
 * selector placement, and an expandable open/close state.
 *
 * The footer automatically applies dark or static styling based on whether
 * the current page content is a fullscreen light view.
 *
 * @see {@link BottomMenu}
 * @see {@link Header}
 * @category Module
 *
 * @example
 * const footer = new Footer();
 * footer.show();
 * footer.setContent(copyrightKnot);
 */
export declare class Footer {
    options: Objekt;
    footerKnot: Knot;
    templateViewKnot: Knot;
    contentKnot: Knot;
    localesKnot: Knot;
    /**
     * Creates a new Footer instance and queries the footer DOM elements.
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
     * Queries the `#footer` element and its child containers for content
     * and locale areas.
     */
    private _init;
    /**
     * Shows the footer and applies contextual styling. If the current page
     * content is a fullscreen light view, the footer receives a dark
     * background and static positioning; otherwise dark styling is removed.
     *
     * @example
     * footer.show();
     */
    show(): void;
    /**
     * Hides the footer and removes static positioning from the template view.
     *
     * @example
     * footer.hide();
     */
    hide(): void;
    /**
     * Appends a content element to the footer's content container.
     *
     * @param {Knot} contentKnot - The DOM element wrapper to append.
     *
     * @example
     * const copyright = new Knot('span');
     * copyright.setHtml('2024 My App');
     * footer.setContent(copyright);
     */
    setContent(contentKnot: Knot): void;
    /**
     * Returns the container {@link Knot} designated for the locale selector
     * UI within the footer.
     *
     * @returns {Knot} The locales container element.
     *
     * @example
     * const localesContainer = footer.getLocalesContainer();
     */
    getLocalesContainer(): Knot;
    /**
     * Expands the footer to its open state.
     */
    open(): void;
    /**
     * Collapses the footer from its open state.
     */
    close(): void;
    /**
     * Checks whether the footer is currently in its expanded (open) state.
     *
     * @returns {boolean} True if the footer is open, false otherwise.
     */
    isOpened(): boolean;
    /**
     * Toggles the footer between its open and closed states.
     *
     * @example
     * footer.toogle();
     */
    toogle(): void;
}
