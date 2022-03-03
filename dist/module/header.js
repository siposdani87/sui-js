import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Header {
    options;
    headerNode;
    leftMenuButton;
    topMenuButton;
    brandNode;
    brandNodeImage;
    brandNodeTitle;
    mainContainerNode;
    templateViewNode;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.headerNode = new Query('#header').getItem();
        this.leftMenuButton = new Query('#open-left-menu', this.headerNode).getItem();
        this.topMenuButton = new Query('#toggle-top-menu', this.headerNode).getItem();
        this.brandNode = new Query('.brand', this.headerNode).getItem();
        this.brandNode.setAttribute('href', 'javascript:void(0)');
        this.brandNode.addEventListener('click', () => {
            this.eventLogoClick();
        });
        this.brandNodeImage = new Query('.brand img', this.brandNode).getItem();
        this.brandNodeTitle = new Query('.brand .app-title', this.brandNode).getItem();
        this.mainContainerNode = new Query('.main-container').getItem();
        this.templateViewNode = new Query('.template-view').getItem();
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
        this.brandNodeTitle.setHtml(title);
    }
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url) {
        this.brandNode.setAttribute('href', url);
    }
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath) {
        this.brandNodeImage.setAttribute('src', imagePath);
    }
    /**
     * @return {undefined}
     */
    open() {
        this.headerNode.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.headerNode.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show() {
        this.headerNode.removeClass('hidden');
        this.mainContainerNode.addClass('header-padding');
        this.templateViewNode.addClass('has-header');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.headerNode.addClass('hidden');
        this.mainContainerNode.removeClass('header-padding');
        this.templateViewNode.removeClass('has-header');
    }
    /**
     * @return {undefined}
     */
    showShadow() {
        this.headerNode.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow() {
        this.headerNode.removeClass('shadow');
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
