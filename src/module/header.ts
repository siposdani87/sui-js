import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Header {
    options: Objekt;
    headerKnot: Knot;
    leftMenuButton: Knot;
    topMenuButton: Knot;
    brandKnot: Knot;
    brandKnotImage: Knot;
    brandKnotTitle: Knot;
    mainContainerKnot: Knot;
    templateViewKnot: Knot;
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
        this.headerKnot = new Query('#header').getKnot();

        this.leftMenuButton = new Query(
            '#open-left-menu',
            this.headerKnot,
        ).getKnot();
        this.topMenuButton = new Query(
            '#toggle-top-menu',
            this.headerKnot,
        ).getKnot();

        this.brandKnot = new Query('.brand', this.headerKnot).getKnot();
        this.brandKnot.setAttribute('href', 'javascript:void(0)');
        this.brandKnot.addEventListener('click', () => {
            this.eventLogoClick();
        });

        this.brandKnotImage = new Query('.brand img', this.brandKnot).getKnot();
        this.brandKnotTitle = new Query(
            '.brand .app-title',
            this.brandKnot,
        ).getKnot();

        this.mainContainerKnot = new Query('.main-container').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
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
        this.brandKnotTitle.setHtml(title);
    }
    /**
     * @param {string} url
     * @return {undefined}
     */
    setUrl(url: string): void {
        this.brandKnot.setAttribute('href', url);
    }
    /**
     * @param {string} imagePath
     * @return {undefined}
     */
    setImage(imagePath: string): void {
        this.brandKnotImage.setAttribute('src', imagePath);
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.headerKnot.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.headerKnot.removeClass('open');
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.headerKnot.removeClass('hidden');
        this.mainContainerKnot.addClass('header-padding');
        this.templateViewKnot.addClass('has-header');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.headerKnot.addClass('hidden');
        this.mainContainerKnot.removeClass('header-padding');
        this.templateViewKnot.removeClass('has-header');
    }
    /**
     * @return {undefined}
     */
    showShadow(): void {
        this.headerKnot.addClass('shadow');
    }
    /**
     * @return {undefined}
     */
    hideShadow(): void {
        this.headerKnot.removeClass('shadow');
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
