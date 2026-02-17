import { Knot } from '../core';
import { Query } from '../core/query';

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
export class NavBar {
    navBarHeader!: Knot;
    navBar!: Knot;
    toggleNavBarIcon!: Knot;

    /**
     * Creates a new NavBar instance, queries the navigation bar DOM
     * elements, and binds the toggle click event.
     */
    constructor() {
        this._init();
    }

    /**
     * Queries the nav bar header, nav bar container, and toggle button,
     * then binds the toggle click handler.
     */
    private _init(): void {
        this.navBarHeader = new Query('.nav-bar-header').getKnot();
        this.navBar = new Query('#nav-bar', this.navBarHeader).getKnot();

        const toggleNavBar = new Query(
            '#toggle-nav-bar',
            this.navBarHeader,
        ).getKnot();
        toggleNavBar.setAttribute('href', 'javascript:void(0)');
        toggleNavBar.addEventListener('click', () => {
            this.toggle();
        });
        this.toggleNavBarIcon = new Query('em', toggleNavBar).getKnot();
    }

    /**
     * Toggles the navigation bar between its expanded and collapsed states.
     *
     * @example
     * navBar.toggle();
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Checks whether the navigation bar is currently in its expanded state.
     *
     * @returns {boolean} True if the nav bar is open, false otherwise.
     */
    isOpened(): boolean {
        return this.navBar.hasClass('open');
    }

    /**
     * Expands the navigation bar and changes the toggle icon to 'close'.
     *
     * @example
     * navBar.open();
     */
    open(): void {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }

    /**
     * Collapses the navigation bar and changes the toggle icon to 'menu'.
     */
    close(): void {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }

    /**
     * Shows the navigation bar header by removing the 'hidden' class.
     *
     * @example
     * navBar.show();
     */
    show(): void {
        this.navBarHeader.removeClass('hidden');
    }

    /**
     * Hides the navigation bar header by adding the 'hidden' class.
     */
    hide(): void {
        this.navBarHeader.addClass('hidden');
    }

    /**
     * Adds a drop shadow beneath the navigation bar.
     */
    showShadow(): void {
        this.navBar.addClass('shadow');
    }

    /**
     * Removes the drop shadow from the navigation bar.
     */
    hideShadow(): void {
        this.navBar.removeClass('shadow');
    }

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
    getContainer(): Knot {
        return this.navBar;
    }
}
