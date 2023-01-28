import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class Footer {
    options: Objekt;
    footerKnot: Knot;
    templateViewKnot: Knot;
    contentKnot: Knot;
    localesKnot: Knot;
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
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.footerKnot = new Query('#footer').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
        this.contentKnot = new Query('.content', this.footerKnot).getKnot();
        this.localesKnot = new Query('.locales', this.footerKnot).getKnot();
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.footerKnot.removeClass(['static', 'hidden', 'has-footer']);
        const contentKnot = new Query(
            '.page-content.fullscreen',
            this.templateViewKnot,
        ).getKnot();
        if (contentKnot && !contentKnot.isEmpty()) {
            const isLightContent = contentKnot.hasClass('light');
            if (isLightContent) {
                this.footerKnot.addClass('dark');
            } else {
                this.footerKnot.removeClass('dark');
            }
            this.footerKnot.addClass('static');
            this.templateViewKnot.addClass('has-footer');
        }
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.footerKnot.addClass('hidden');
        this.footerKnot.removeClass('static');
        this.templateViewKnot.removeClass('has-footer');
    }
    /**
     * @param {!Knot} contentKnot
     * @return {undefined}
     */
    setContent(contentKnot: Knot): void {
        this.contentKnot.appendChild(contentKnot);
    }
    /**
     * @return {!Knot}
     */
    getLocalesContainer(): Knot {
        return this.localesKnot;
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.footerKnot.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.footerKnot.removeClass('open');
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return this.footerKnot.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    toogle(): void {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
}
