import { Query } from '../core/query';
/**
 * @class
 */
export class BottomMenu {
    /**
     * @param {!Footer} footer
     */
    constructor(footer) {
        this.footer = footer;
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.bottomMenu = new Query('#bottom-menu', this.footer.footerKnot).getKnot();
        const openBottomMenu = new Query('#open-bottom-menu', this.footer.footerKnot).getKnot();
        openBottomMenu.setAttribute('href', 'javascript:void(0)');
        openBottomMenu.addEventListener('click', () => {
            this.toggle();
        });
        const closeBottomMenu = new Query('#close-bottom-menu', this.footer.footerKnot).getKnot();
        closeBottomMenu.setAttribute('href', 'javascript:void(0)');
        closeBottomMenu.addEventListener('click', () => {
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
        return this.bottomMenu.hasClass('visible-flex');
    }
    /**
     * @return {undefined}
     */
    open() {
        this.bottomMenu.addClass('visible-flex');
        this.footer.open();
    }
    /**
     * @return {undefined}
     */
    close() {
        this.bottomMenu.removeClass('visible-flex');
        this.footer.close();
    }
    /**
     * @return {!Knot}
     */
    getContainer() {
        return this.bottomMenu;
    }
}
