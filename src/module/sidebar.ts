import { Item } from '../core';
import { Query } from '../core/query';

/**
 * @class
 */
export class Sidebar {
    selector: string;
    sidebar: Item;
    button: Item;
    /**
     * @param {string} selector
     */
    constructor(selector: string) {
        this.selector = selector;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.sidebar = new Query(this.selector).getItem();
        this.button = new Query('a', this.sidebar).getItem();
        this.button.setAttribute('href', 'javascript:void(0)');
        this.button.addEventListener('click', () => {
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
        return this.sidebar.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.sidebar.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.sidebar.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.sidebar.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.sidebar.addClass('hidden');
    }
    /**
     * @param {number} scrollTop
     * @param {number} windowHeight
     * @return {undefined}
     */
    setButtonPosition(scrollTop: number, windowHeight: number): void {
        const height = Math.round(scrollTop + windowHeight / 2);
        this.button.setStyle({
            top: height + 'px',
        });
    }
}
