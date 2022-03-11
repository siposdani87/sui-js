import { Item } from '../core';
import { Query } from '../core/query';

/**
 * @class
 */
export class NavBar {
    navBarHeader: Item;
    navBar: Item;
    toggleNavBarIcon: Item;
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this.navBarHeader = new Query('.nav-bar-header').getItem();
        this.navBar = new Query('#nav-bar', this.navBarHeader).getItem();

        const toggleNavBar = new Query(
            '#toggle-nav-bar',
            this.navBarHeader,
        ).getItem();
        toggleNavBar.setAttribute('href', 'javascript:void(0)');
        toggleNavBar.addEventListener('click', () => {
            this.toggle();
        });
        this.toggleNavBarIcon = new Query('em', toggleNavBar).getItem();
    }
    /**
     * @return {undefined}
     */
    toggle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return this.navBar.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.navBarHeader.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.navBarHeader.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    showShadow(): void {
        this.navBar.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow(): void {
        this.navBar.removeClass('shadow');
    }
    /**
     * @return {!Item}
     */
    getContainer(): Item {
        return this.navBar;
    }
}
