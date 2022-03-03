import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class Footer {
    options: Objekt;
    footerNode: any;
    templateViewNode: any;
    contentNode: any;
    localesNode: any;
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
        this.footerNode = new Query('#footer').getItem();
        this.templateViewNode = new Query('.template-view').getItem();
        this.contentNode = new Query('.content', this.footerNode).getItem();
        this.localesNode = new Query('.locales', this.footerNode).getItem();
    }
    /**
     * @return {undefined}
     */
    show() {
        this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
        const contentNode = new Query(
            '.page-content.fullscreen',
            this.templateViewNode,
        ).getItem();
        if (contentNode && !contentNode.isEmpty()) {
            const isLightContent = contentNode.hasClass('light');
            if (isLightContent) {
                this.footerNode.addClass('dark');
            } else {
                this.footerNode.removeClass('dark');
            }
            this.footerNode.addClass('static');
            this.templateViewNode.addClass('has-footer');
        }
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.footerNode.addClass('hidden');
        this.footerNode.removeClass('static');
        this.templateViewNode.removeClass('has-footer');
    }
    /**
     * @param {!Item} contentNode
     * @return {undefined}
     */
    setContent(contentNode) {
        this.contentNode.appendChild(contentNode);
    }
    /**
     * @return {!Item}
     */
    getLocalesContainer() {
        return this.localesNode;
    }
    /**
     * @return {undefined}
     */
    open() {
        this.footerNode.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close() {
        this.footerNode.removeClass('open');
    }
    /**
     * @return {boolean}
     */
    isOpened() {
        return this.footerNode.hasClass('open');
    }
    /**
     * @return {undefined}
     */
    toogle() {
        if (this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
}
