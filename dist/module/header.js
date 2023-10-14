import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
export class Header {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    _init() {
        this.headerKnot = new Query('#header').getKnot();
        this.leftMenuButton = new Query('#open-left-menu', this.headerKnot).getKnot();
        this.topMenuButton = new Query('#toggle-top-menu', this.headerKnot).getKnot();
        this.brandKnot = new Query('.brand', this.headerKnot).getKnot();
        this.brandKnot.setAttribute('href', 'javascript:void(0)');
        this.brandKnot.addEventListener('click', () => {
            this.eventLogoClick();
        });
        this.brandKnotImage = new Query('.brand img', this.brandKnot).getKnot();
        this.brandKnotTitle = new Query('.brand .app-title', this.brandKnot).getKnot();
        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
    }
    eventLogoClick() {
        consoleDebug('Header.eventLogoClick()');
    }
    setTitle(title) {
        this.brandKnotTitle.setHtml(title);
    }
    setUrl(url) {
        this.brandKnot.setAttribute('href', url);
    }
    setImage(imagePath) {
        this.brandKnotImage.setAttribute('src', imagePath);
    }
    open() {
        this.headerKnot.addClass('open');
    }
    close() {
        this.headerKnot.removeClass('open');
    }
    show() {
        this.headerKnot.removeClass('hidden');
        this.mainContainerKnot.addClass('header-padding');
        this.templateViewKnot.addClass('has-header');
    }
    hide() {
        this.headerKnot.addClass('hidden');
        this.mainContainerKnot.removeClass('header-padding');
        this.templateViewKnot.removeClass('has-header');
    }
    showShadow() {
        this.headerKnot.addClass('shadow');
    }
    hideShadow() {
        this.headerKnot.removeClass('shadow');
    }
    showLeftMenuButton() {
        this.leftMenuButton.removeClass('hidden');
    }
    hideLeftMenuButton() {
        this.leftMenuButton.addClass('hidden');
    }
    showTopMenuButton() {
        this.topMenuButton.removeClass('hidden');
    }
    hideTopMenuButton() {
        this.topMenuButton.addClass('hidden');
    }
}
