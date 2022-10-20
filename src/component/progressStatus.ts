import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class ProgressStatus {
    progressStatusKnot: Knot;
    options: Objekt;
    iconKnot: Knot;
    textKnot: Knot;
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.progress-status',
        opt_options: Object | undefined = {},
    ) {
        this.progressStatusKnot = new Query(opt_selector, dom).getKnot();
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
        _self.options = new Objekt({
            successStyle: 'success',
            infoStyle: 'info',
            warningStyle: 'warning',
            errorStyle: 'error',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.iconKnot = new Query('.icon', this.progressStatusKnot).getKnot();
        this.textKnot = new Query('.text', this.progressStatusKnot).getKnot();
    }
    /**
     * @private
     * @param {string} cssClass
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    private _setStatus(
        cssClass: string,
        text: string,
        opt_icon: string | undefined = '',
    ): void {
        this.progressStatusKnot.removeClass([
            this.options.errorStyle,
            this.options.successStyle,
            this.options.infoStyle,
            this.options.warningStyle,
        ]);
        this.progressStatusKnot.addClass(cssClass);
        this.textKnot.setHtml(text);
        if (opt_icon) {
            this.iconKnot.setHtml(opt_icon);
        }
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setSuccess(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.successStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setInfo(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.infoStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setWarning(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.warningStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setError(text: string, opt_icon: string | undefined = ''): void {
        this._setStatus(this.options.errorStyle, text, opt_icon);
    }
}
