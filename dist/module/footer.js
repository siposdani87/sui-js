import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
export class Footer {
    /**
     * Creates a new Footer instance and queries the footer DOM elements.
     *
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults.
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    /**
     * Queries the `#footer` element and its child containers for content
     * and locale areas.
     */
    _init() {
        this.footerKnot = new Query('#footer').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
        this.contentKnot = new Query('.content', this.footerKnot).getKnot();
        this.localesKnot = new Query('.locales', this.footerKnot).getKnot();
    }
    /**
     * Shows the footer and applies contextual styling. If the current page
     * content is a fullscreen light view, the footer receives a dark
     * background and static positioning; otherwise dark styling is removed.
     *
     * @example
     * footer.show();
     */
    show() {
        this.footerKnot.removeClass(['static', 'hidden', 'has-footer']);
        const contentKnot = new Query('.page-content.fullscreen', this.templateViewKnot).getKnot();
        if (contentKnot && !contentKnot.isEmpty()) {
            const isLightContent = contentKnot.hasClass('light');
            if (isLightContent) {
                this.footerKnot.addClass('dark');
            }
            else {
                this.footerKnot.removeClass('dark');
            }
            this.footerKnot.addClass('static');
            this.templateViewKnot.addClass('has-footer');
        }
    }
    /**
     * Hides the footer and removes static positioning from the template view.
     *
     * @example
     * footer.hide();
     */
    hide() {
        this.footerKnot.addClass('hidden');
        this.footerKnot.removeClass('static');
        this.templateViewKnot.removeClass('has-footer');
    }
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
    setContent(contentKnot) {
        this.contentKnot.appendChild(contentKnot);
    }
    /**
     * Returns the container {@link Knot} designated for the locale selector
     * UI within the footer.
     *
     * @returns {Knot} The locales container element.
     *
     * @example
     * const localesContainer = footer.getLocalesContainer();
     */
    getLocalesContainer() {
        return this.localesKnot;
    }
    /**
     * Expands the footer to its open state.
     */
    open() {
        this.footerKnot.addClass('open');
    }
    /**
     * Collapses the footer from its open state.
     */
    close() {
        this.footerKnot.removeClass('open');
    }
    /**
     * Checks whether the footer is currently in its expanded (open) state.
     *
     * @returns {boolean} True if the footer is open, false otherwise.
     */
    isOpened() {
        return this.footerKnot.hasClass('open');
    }
    /**
     * Toggles the footer between its open and closed states.
     *
     * @example
     * footer.toogle();
     */
    toogle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
}
