import { Query } from '../core/query';

/**
 * @class
 */
export class Sidebar {
    selector: any;
    sidebar: any;
    button: any;
    /**
     * @param {string} selector
     */
    constructor(selector) {
        this.selector = selector;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
    toggle() {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
    /**
     * @return {boolean}
     */
    isOpened() {
        return this.sidebar.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    open() {
        this.sidebar.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.sidebar.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show() {
        this.sidebar.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.sidebar.addClass('hidden');
    }
    /**
     * @param {number} scrollTop
     * @param {number} windowHeight
     * @return {undefined}
     */
    setButtonPosition(scrollTop, windowHeight) {
        const height = Math.round(scrollTop + windowHeight / 2);
        this.button.setStyle({
            top: height + 'px',
        });
    }
}
