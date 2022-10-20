import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Header {
    options: Objekt;
    headerNode: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandNode: Knot;
    brandNodeImage: Knot;
    brandNodeTitle: Knot;
    mainContainerNode: Knot;
    templateViewNode: Knot;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.headerNode = new Query('#header').getKnot();

        this.leftMenuButton = new Query(
            '#open-left-menu',
            this.headerNode,
        ).getKnot();
        this.topMenuButton = new Query(
            '#toggle-top-menu',
            this.headerNode,
        ).getKnot();

        this.brandNode = new Query('.brand', this.headerNode).getKnot();
        this.brandNode.setAttribute('href', 'javascript:void(0)');
        this.brandNode.addEventListener('click', () => {
            this.eventLogoClick();
        });

        this.brandNodeImage = new Query('.brand img', this.brandNode).getKnot();
        this.brandNodeTitle = new Query(
            '.brand .app-title',
            this.brandNode,
        ).getKnot();

        this.mainContainerNode = new Query('.main-container').getKnot();
        this.templateViewNode = new Query('.template-view').getKnot();
    }
    /**
     * @return {undefined}
     */
    eventLogoClick(): void {
        consoleWarn('Header.eventLogoClick()');
    }
    /**
     * @param {string} title
     * @return {undefined}
     */
    setTitle(title: string): void {
        this.brandNodeTitle.setHtml(title);
    }
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url: string): void {
        this.brandNode.setAttribute('href', url);
    }
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath: string): void {
        this.brandNodeImage.setAttribute('src', imagePath);
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.headerNode.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.headerNode.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.headerNode.removeClass('hidden');
        this.mainContainerNode.addClass('header-padding');
        this.templateViewNode.addClass('has-header');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.headerNode.addClass('hidden');
        this.mainContainerNode.removeClass('header-padding');
        this.templateViewNode.removeClass('has-header');
    }
    /**
     * @return {undefined}
     */
    showShadow(): void {
        this.headerNode.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow(): void {
        this.headerNode.removeClass('shadow');
    }
    /**
     * @return {undefined}
     */
    showLeftMenuButton(): void {
        this.leftMenuButton.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hideLeftMenuButton(): void {
        this.leftMenuButton.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    showTopMenuButton(): void {
        this.topMenuButton.removeClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hideTopMenuButton(): void {
        this.topMenuButton.addClass('hidden');
    }
}
