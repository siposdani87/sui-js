import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';

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
export class Header {
    options!: Objekt;
    headerKnot!: Knot;
    leftMenuButton!: Knot;
    topMenuButton!: Knot;
    brandKnot!: Knot;
    brandKnotImage!: Knot;
    brandKnotTitle!: Knot;
    mainContainerKnot!: Knot;
    templateViewKnot!: Knot;

    /**
     * Creates a new Header instance, queries the header DOM elements,
     * and binds the logo click event.
     *
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults.
     */
    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }

    /**
     * Queries all header-related DOM elements and binds the logo click
     * event handler.
     */
    private _init(): void {
        this.headerKnot = new Query('#header').getKnot();

        this.leftMenuButton = new Query(
            '#open-left-menu',
            this.headerKnot,
        ).getKnot();
        this.topMenuButton = new Query(
            '#toggle-top-menu',
            this.headerKnot,
        ).getKnot();

        this.brandKnot = new Query('.brand', this.headerKnot).getKnot();
        this.brandKnot.setAttribute('href', 'javascript:void(0)');
        this.brandKnot.addEventListener('click', () => {
            this.eventLogoClick();
        });

        this.brandKnotImage = new Query('.brand img', this.brandKnot).getKnot();
        this.brandKnotTitle = new Query(
            '.brand .app-title',
            this.brandKnot,
        ).getKnot();

        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
    }

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
    eventLogoClick(): void {
        consoleDebug('Header.eventLogoClick()');
    }

    /**
     * Sets the application title text displayed in the header brand area.
     *
     * @param {string} title - The title HTML or text to display.
     *
     * @example
     * header.setTitle('Dashboard');
     */
    setTitle(title: string): void {
        this.brandKnotTitle.setHtml(title);
    }

    /**
     * Sets the URL that the brand/logo element links to.
     *
     * @param {string} url - The target URL for the brand link.
     *
     * @example
     * header.setUrl('/home');
     */
    setUrl(url: string): void {
        this.brandKnot.setAttribute('href', url);
    }

    /**
     * Sets the logo image source displayed in the header brand area.
     *
     * @param {string} imagePath - The path or URL to the logo image.
     *
     * @example
     * header.setImage('/assets/logo.svg');
     */
    setImage(imagePath: string): void {
        this.brandKnotImage.setAttribute('src', imagePath);
    }

    /**
     * Expands the header to its open/extended state by adding the
     * 'open' CSS class.
     */
    open(): void {
        this.headerKnot.addClass('open');
    }

    /**
     * Collapses the header from its open/extended state by removing the
     * 'open' CSS class.
     */
    close(): void {
        this.headerKnot.removeClass('open');
    }

    /**
     * Shows the header and applies appropriate padding to the main
     * container and template view so content does not overlap.
     *
     * @example
     * header.show();
     */
    show(): void {
        this.headerKnot.removeClass('hidden');
        this.mainContainerKnot.addClass('header-padding');
        this.templateViewKnot.addClass('has-header');
    }

    /**
     * Hides the header and removes padding adjustments from the main
     * container and template view.
     *
     * @example
     * header.hide();
     */
    hide(): void {
        this.headerKnot.addClass('hidden');
        this.mainContainerKnot.removeClass('header-padding');
        this.templateViewKnot.removeClass('has-header');
    }

    /**
     * Adds a drop shadow beneath the header.
     */
    showShadow(): void {
        this.headerKnot.addClass('shadow');
    }

    /**
     * Removes the drop shadow from the header.
     */
    hideShadow(): void {
        this.headerKnot.removeClass('shadow');
    }

    /**
     * Shows the left menu navigation button (hamburger icon) in the header.
     */
    showLeftMenuButton(): void {
        this.leftMenuButton.removeClass('hidden');
    }

    /**
     * Hides the left menu navigation button from the header.
     */
    hideLeftMenuButton(): void {
        this.leftMenuButton.addClass('hidden');
    }

    /**
     * Shows the top menu toggle button in the header.
     */
    showTopMenuButton(): void {
        this.topMenuButton.removeClass('hidden');
    }

    /**
     * Hides the top menu toggle button from the header.
     */
    hideTopMenuButton(): void {
        this.topMenuButton.addClass('hidden');
    }
}
