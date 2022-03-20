import { Item } from '../core';
import { Query } from '../core/query';
import { Header } from './header';

/**
 * @class
 */
export class TopMenu {
    header: any;
    topMenu: any;
    toggleTopMenu: any;
    /**
     * @param {!Header} header
     */
    constructor(header: Header) {
        this.header = header;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.topMenu = new Query('#top-menu', this.header.headerNode).getItem();

        this.toggleTopMenu = new Query(
            '#toggle-top-menu',
            this.header.headerNode,
        ).getItem();
        this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
        this.toggleTopMenu.addEventListener('click', () => {
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
        return this.topMenu.hasClass('visible-flex');
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.header.open();
        this.topMenu.addClass('visible-flex');
        this.toggleTopMenu.addClass('active');
        this.header.showShadow();
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.header.close();
        this.topMenu.removeClass('visible-flex');
        this.toggleTopMenu.removeClass('active');
        this.header.hideShadow();
    }
    /**
     * @return {!Item}
     */
    getContainer(): Item {
        return this.topMenu;
    }
}
