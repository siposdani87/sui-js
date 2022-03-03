import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class ProgressStatus {
    progressStatusNode;
    options;
    iconNode;
    textNode;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.progress-status', opt_options = {}) {
        this.progressStatusNode = new Query(opt_selector, dom).getItem();
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
    _init() {
        this.iconNode = new Query('.icon', this.progressStatusNode).getItem();
        this.textNode = new Query('.text', this.progressStatusNode).getItem();
    }
    /**
     * @private
     * @param {string} cssClass
     * @param {string} text
     * @param {string=} opt_icon
     * @return {undefined}
     */
    _setStatus(cssClass, text, opt_icon = '') {
        this.progressStatusNode.removeClass([
            this.options.errorStyle,
            this.options.successStyle,
            this.options.infoStyle,
            this.options.warningStyle,
        ]);
        this.progressStatusNode.addClass(cssClass);
        this.textNode.setHtml(text);
        if (opt_icon) {
            this.iconNode.setHtml(opt_icon);
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
