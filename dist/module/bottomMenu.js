import { Query } from '../core/query';
export class BottomMenu {
    constructor(footer) {
        this.footer = footer;
        this._init();
    }
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
    toggle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    isOpened() {
        return this.bottomMenu.hasClass('visible-flex');
    }
    open() {
        this.bottomMenu.addClass('visible-flex');
        this.footer.open();
    }
    close() {
        this.bottomMenu.removeClass('visible-flex');
        this.footer.close();
    }
    getContainer() {
        return this.bottomMenu;
    }
}
