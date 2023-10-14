import { Query } from '../core/query';
export class NavBar {
    constructor() {
        this._init();
    }
    _init() {
        this.navBarHeader = new Query('.nav-bar-header').getKnot();
        this.navBar = new Query('#nav-bar', this.navBarHeader).getKnot();
        const toggleNavBar = new Query('#toggle-nav-bar', this.navBarHeader).getKnot();
        toggleNavBar.setAttribute('href', 'javascript:void(0)');
        toggleNavBar.addEventListener('click', () => {
            this.toggle();
        });
        this.toggleNavBarIcon = new Query('em', toggleNavBar).getKnot();
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
        return this.navBar.hasClass('open');
    }
    open() {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }
    close() {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }
    show() {
        this.navBarHeader.removeClass('hidden');
    }
    hide() {
        this.navBarHeader.addClass('hidden');
    }
    showShadow() {
        this.navBar.addClass('shadow');
    }
    hideShadow() {
        this.navBar.removeClass('shadow');
    }
    getContainer() {
        return this.navBar;
    }
}
