import { Knot } from '../core';
import { Query } from '../core/query';
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
export class BottomMenu {
    footer: Footer;
    bottomMenu!: Knot;

    /**
     * Creates a new BottomMenu instance and binds the toggle click events
     * within the provided footer.
     *
     * @param {Footer} footer - The application footer instance that
     *     contains the bottom menu DOM elements.
     */
    constructor(footer: Footer) {
        this.footer = footer;
        this._init();
    }

    /**
     * Queries the bottom menu container and binds click handlers for the
     * open and close buttons.
     */
    private _init(): void {
        this.bottomMenu = new Query(
            '#bottom-menu',
            this.footer.footerKnot,
        ).getKnot();

        const openBottomMenu = new Query(
            '#open-bottom-menu',
            this.footer.footerKnot,
        ).getKnot();
        openBottomMenu.setAttribute('href', 'javascript:void(0)');
        openBottomMenu.addEventListener('click', () => {
            this.toggle();
        });

        const closeBottomMenu = new Query(
            '#close-bottom-menu',
            this.footer.footerKnot,
        ).getKnot();
        closeBottomMenu.setAttribute('href', 'javascript:void(0)');
        closeBottomMenu.addEventListener('click', () => {
            this.toggle();
        });
    }

    /**
     * Toggles the bottom menu between its open and closed states.
     *
     * @example
     * bottomMenu.toggle();
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Checks whether the bottom menu is currently visible.
     *
     * @returns {boolean} True if the menu is open, false otherwise.
     */
    isOpened(): boolean {
        return this.bottomMenu.hasClass('visible-flex');
    }

    /**
     * Opens the bottom menu by making it visible and expanding the footer.
     *
     * @example
     * bottomMenu.open();
     */
    open(): void {
        this.bottomMenu.addClass('visible-flex');
        this.footer.open();
    }

    /**
     * Closes the bottom menu by hiding it and collapsing the footer.
     */
    close(): void {
        this.bottomMenu.removeClass('visible-flex');
        this.footer.close();
    }

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
    getContainer(): Knot {
        return this.bottomMenu;
    }
}
