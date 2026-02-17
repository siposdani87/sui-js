import { noop } from '../utils/operation';
import { Query } from '../core/query';
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
export class LeftMenu {
    body!: Knot;
    mainContainerKnot!: Knot;
    leftMenu!: Knot;
    mainMenu!: Knot;
    subMenu!: Knot;
    mainMenuContainer!: Knot;
    subMenuContainer!: Knot;
    mainMenuTitle!: Knot;
    subMenuTitle!: Knot;

    /**
     * Creates a new LeftMenu instance, queries the menu DOM elements,
     * and binds open/close event handlers.
     */
    constructor() {
        this._init();
    }

    /**
     * Queries all left menu DOM elements including main and sub-menu
     * panels, containers, and titles.
     */
    private _init(): void {
        this.body = new Query('body').getKnot();
        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.leftMenu = new Query('#left-menu').getKnot();

        this.mainMenu = new Query('.main-menu', this.leftMenu).getKnot();
        this.subMenu = new Query('.sub-menu', this.leftMenu).getKnot();
        this.subMenu.addClass('hidden');

        this.mainMenuContainer = new Query(
            '.menu-container',
            this.mainMenu,
        ).getKnot();
        this.subMenuContainer = new Query(
            '.menu-container',
            this.subMenu,
        ).getKnot();

        this.mainMenuTitle = new Query('h3', this.mainMenu).getKnot();
        this.subMenuTitle = new Query('h3', this.subMenu).getKnot();

        this._initEvents();
    }

    /**
     * Binds click handlers for opening, closing, and navigating between
     * the main menu and sub-menu panels.
     */
    private _initEvents() {
        this.leftMenu.addEventListener('click', () => {
            this.close();
        });

        this.mainMenuContainer.addEventListener('click', () => {
            noop();
            return true;
        });
        this.subMenuContainer.addEventListener('click', () => {
            noop();
            return true;
        });

        const openLeftMenu = new Query('#open-left-menu').getKnot();
        openLeftMenu.setAttribute('href', 'javascript:void(0)');
        openLeftMenu.addEventListener('click', () => {
            this.open();
        });

        const closeLeftMenu = new Query(
            '#close-left-menu',
            this.mainMenu,
        ).getKnot();
        closeLeftMenu.setAttribute('href', 'javascript:void(0)');
        closeLeftMenu.addEventListener('click', () => {
            this.close();
        });

        const closeSubMenu = new Query(
            '#close-sub-menu',
            this.subMenu,
        ).getKnot();
        closeSubMenu.setAttribute('href', 'javascript:void(0)');
        closeSubMenu.addEventListener('click', () => {
            this.closeSubMenu();
        });
    }

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
    open(opt_title: string | undefined = ''): void {
        this.body.addClass('overflow-hidden');
        this.mainContainerKnot.addClass('blur');

        this.leftMenu.addClass('visible-block');

        this.mainMenuTitle.setHtml(opt_title);
    }

    /**
     * Closes the left menu sidebar, removes the blur overlay, and
     * restores body scrolling.
     */
    close(): void {
        this.body.removeClass('overflow-hidden');
        this.mainContainerKnot.removeClass('blur');
        this.leftMenu.removeClass('visible-block');
    }

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
    openSubMenu(opt_title: string | undefined = ''): void {
        this.mainMenu.addClass('hidden');
        this.subMenu.removeClass('hidden');
        this.subMenuTitle.setHtml(opt_title);
    }

    /**
     * Returns the left menu view from the sub-menu panel back to the
     * main menu panel.
     */
    closeSubMenu(): void {
        this.mainMenu.removeClass('hidden');
        this.subMenu.addClass('hidden');
    }

    /**
     * Returns the main menu container {@link Knot} where primary menu
     * items should be appended.
     *
     * @returns {Knot} The main menu container element.
     *
     * @example
     * const mainContainer = leftMenu.getMainContainer();
     */
    getMainContainer(): Knot {
        return this.mainMenuContainer;
    }

    /**
     * Returns the sub-menu container {@link Knot} where secondary menu
     * items should be appended.
     *
     * @returns {Knot} The sub-menu container element.
     *
     * @example
     * const subContainer = leftMenu.getSubContainer();
     */
    getSubContainer(): Knot {
        return this.subMenuContainer;
    }
}
