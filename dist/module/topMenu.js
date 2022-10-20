import { Query } from '../core/query';
/**
 * @class
 */
export class TopMenu {
    /**
     * @param {!Header} header
     */
    constructor(header) {
        this.header = header;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.topMenu = new Query('#top-menu', this.header.headerNode).getKnot();
        this.toggleTopMenu = new Query('#toggle-top-menu', this.header.headerNode).getKnot();
        this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
        this.toggleTopMenu.addEventListener('click', () => {
            this.toggle();
        });
    }
    /**
     * @return {undefined}
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
     * @return {boolean}
     */
    isOpened() {
        return this.topMenu.hasClass('visible-flex');
    }
    /**
     * @return {undefined}
     */
    open() {
        this.header.open();
        this.topMenu.addClass('visible-flex');
        this.toggleTopMenu.addClass('active');
        this.header.showShadow();
    }
    /**
     * @return {undefined}
     */
    close() {
        this.header.close();
        this.topMenu.removeClass('visible-flex');
        this.toggleTopMenu.removeClass('active');
        this.header.hideShadow();
    }
    /**
     * @return {!Knot}
     */
    getContainer() {
        return this.topMenu;
    }
}
