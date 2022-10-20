import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class Footer {
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
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.footerKnot = new Query('#footer').getKnot();
        this.templateViewKnot = new Query('.template-view').getKnot();
        this.contentKnot = new Query('.content', this.footerKnot).getKnot();
        this.localesKnot = new Query('.locales', this.footerKnot).getKnot();
    }
    /**
     * @return {undefined}
     */
    show() {
        this.footerKnot.removeClass(['static', 'hidden', 'has-footer']);
        const contentKnot = new Query('.page-content.fullscreen', this.templateViewKnot).getKnot();
        if (contentKnot && !contentKnot.isEmpty()) {
            const isLightContent = contentKnot.hasClass('light');
            if (isLightContent) {
                this.footerKnot.addClass('dark');
            }
            else {
                this.footerKnot.removeClass('dark');
            }
            this.footerKnot.addClass('static');
            this.templateViewKnot.addClass('has-footer');
        }
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.footerKnot.addClass('hidden');
        this.footerKnot.removeClass('static');
        this.templateViewKnot.removeClass('has-footer');
    }
    /**
     * @param {!Knot} contentKnot
     * @return {undefined}
     */
    setContent(contentKnot) {
        this.contentKnot.appendChild(contentKnot);
    }
    /**
     * @return {!Knot}
     */
    getLocalesContainer() {
        return this.localesKnot;
    }
    /**
     * @return {undefined}
     */
    open() {
        this.footerKnot.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.footerKnot.removeClass('open');
    }
    /**
     * @return {boolean}
     */
    isOpened() {
        return this.footerKnot.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    toogle() {
        if (this.isOpened()) {
            this.close();
        }
        else {
            this.open();
        }
    }
}
