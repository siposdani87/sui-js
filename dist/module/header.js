import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Header {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
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
    /**
     * @return {undefined}
     */
    eventLogoClick() {
        consoleWarn('Header.eventLogoClick()');
    }
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title) {
        this.brandKnotTitle.setHtml(title);
    }
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url) {
        this.brandKnot.setAttribute('href', url);
    }
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath) {
        this.brandKnotImage.setAttribute('src', imagePath);
    }
    /**
     * @return {undefined}
     */
    open() {
        this.headerKnot.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.headerKnot.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show() {
        this.headerKnot.removeClass('hidden');
        this.mainContainerKnot.addClass('header-padding');
        this.templateViewKnot.addClass('has-header');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.headerKnot.addClass('hidden');
        this.mainContainerKnot.removeClass('header-padding');
        this.templateViewKnot.removeClass('has-header');
    }
    /**
     * @return {undefined}
     */
    showShadow() {
        this.headerKnot.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow() {
        this.headerKnot.removeClass('shadow');
    }
    /**
     * @return {undefined}
     */
    showLeftMenuButton() {
        this.leftMenuButton.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hideLeftMenuButton() {
        this.leftMenuButton.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    showTopMenuButton() {
        this.topMenuButton.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hideTopMenuButton() {
        this.topMenuButton.addClass('hidden');
    }
}
