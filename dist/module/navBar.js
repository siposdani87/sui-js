import { Query } from '../core/query';
/**
 * @class
 */
export class NavBar {
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
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
        return this.navBar.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    open() {
        this.navBar.addClass('open');
        this.toggleNavBarIcon.setHtml('close');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.navBar.removeClass('open');
        this.toggleNavBarIcon.setHtml('menu');
    }
    /**
     * @return {undefined}
     */
    show() {
        this.navBarHeader.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.navBarHeader.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    showShadow() {
        this.navBar.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow() {
        this.navBar.removeClass('shadow');
    }
    /**
     * @return {!Knot}
     */
    getContainer() {
        return this.navBar;
    }
}
