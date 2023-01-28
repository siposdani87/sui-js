import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class ProgressStatus {
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.progress-status', opt_options = {}) {
        this.progressStatusKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            successStyle: 'success',
            infoStyle: 'info',
            warningStyle: 'warning',
            errorStyle: 'error',
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
    _setStatus(cssClass, text, opt_icon = '') {
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
    setSuccess(text, opt_icon = '') {
        this._setStatus(this.options.successStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setInfo(text, opt_icon = '') {
        this._setStatus(this.options.infoStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setWarning(text, opt_icon = '') {
        this._setStatus(this.options.warningStyle, text, opt_icon);
    }
    /**
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    setError(text, opt_icon = '') {
        this._setStatus(this.options.errorStyle, text, opt_icon);
    }
}
