import { Query } from '../core/query';
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
export class TopMenu {
    /**
     * Creates a new TopMenu instance and binds the toggle click event
     * within the provided header.
     *
     * @param {Header} header - The application header instance that
     *     contains the top menu DOM elements.
     */
    constructor(header) {
        this.header = header;
        this._init();
    }
    /**
     * Queries the top menu and toggle button elements and binds the
     * click handler.
     */
    _init() {
        this.topMenu = new Query('#top-menu', this.header.headerKnot).getKnot();
        this.toggleTopMenu = new Query('#toggle-top-menu', this.header.headerKnot).getKnot();
        this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
        this.toggleTopMenu.addEventListener('click', () => {
            this.toggle();
        });
    }
    /**
     * Toggles the top menu between its open and closed states.
     *
     * @example
     * topMenu.toggle();
     */
    toggle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Checks whether the top menu is currently visible.
     *
     * @returns {boolean} True if the menu is open, false otherwise.
     */
    isOpened() {
        return this.topMenu.hasClass('visible-flex');
    }
    /**
     * Opens the top menu by expanding the header, showing the menu
     * container, activating the toggle button, and displaying the
     * header shadow.
     *
     * @example
     * topMenu.open();
     */
    open() {
        this.header.open();
        this.topMenu.addClass('visible-flex');
        this.toggleTopMenu.addClass('active');
        this.header.showShadow();
    }
    /**
     * Closes the top menu by collapsing the header, hiding the menu
     * container, deactivating the toggle button, and removing the
     * header shadow.
     */
    close() {
        this.header.close();
        this.topMenu.removeClass('visible-flex');
        this.toggleTopMenu.removeClass('active');
        this.header.hideShadow();
    }
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
    getContainer() {
        return this.topMenu;
    }
}
