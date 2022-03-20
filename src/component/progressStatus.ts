import { Item } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class ProgressStatus {
    progressStatusNode: Item;
    options: Objekt;
    iconNode: Item;
    textNode: Item;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector: string | undefined = '.progress-status', opt_options: Object | undefined = {}) {
        this.progressStatusNode = new Query(opt_selector, dom).getItem();
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
    private _setStatus(cssClass: string, text: string, opt_icon: string | undefined = ''): void {
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
