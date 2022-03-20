import { Item } from '../core';
import { Query } from '../core/query';
import { Footer } from './footer';

/**
 * @class
 */
export class BottomMenu {
    footer: Footer;
    bottomMenu: Item;
    /**
     * @param {!Footer} footer
     */
    constructor(footer: Footer) {
        this.footer = footer;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.bottomMenu = new Query(
            '#bottom-menu',
            this.footer.footerNode,
        ).getItem();

        const openBottomMenu = new Query(
            '#open-bottom-menu',
            this.footer.footerNode,
        ).getItem();
        openBottomMenu.setAttribute('href', 'javascript:void(0)');
        openBottomMenu.addEventListener('click', () => {
            this.toggle();
        });

        const closeBottomMenu = new Query(
            '#close-bottom-menu',
            this.footer.footerNode,
        ).getItem();
        closeBottomMenu.setAttribute('href', 'javascript:void(0)');
        closeBottomMenu.addEventListener('click', () => {
            this.toggle();
        });
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
        return this.bottomMenu.hasClass('visible-flex');
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.bottomMenu.addClass('visible-flex');
        this.footer.open();
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.bottomMenu.removeClass('visible-flex');
        this.footer.close();
    }
    /**
     * @return {!Item}
     */
    getContainer(): Item {
        return this.bottomMenu;
    }
}
