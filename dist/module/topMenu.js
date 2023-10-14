import { Query } from '../core/query';
export class TopMenu {
    constructor(header) {
        this.header = header;
        this._init();
    }
    _init() {
        this.topMenu = new Query('#top-menu', this.header.headerKnot).getKnot();
        this.toggleTopMenu = new Query('#toggle-top-menu', this.header.headerKnot).getKnot();
        this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
        this.toggleTopMenu.addEventListener('click', () => {
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
        return this.topMenu.hasClass('visible-flex');
    }
    open() {
        this.header.open();
        this.topMenu.addClass('visible-flex');
        this.toggleTopMenu.addClass('active');
        this.header.showShadow();
    }
    close() {
        this.header.close();
        this.topMenu.removeClass('visible-flex');
        this.toggleTopMenu.removeClass('active');
        this.header.hideShadow();
    }
    getContainer() {
        return this.topMenu;
    }
}
