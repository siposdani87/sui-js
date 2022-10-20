import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class Footer {
    options: Objekt;
    footerNode: Knot;
    templateViewNode: Knot;
    contentNode: Knot;
    localesNode: Knot;
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
        this.footerNode = new Query('#footer').getKnot();
        this.templateViewNode = new Query('.template-view').getKnot();
        this.contentNode = new Query('.content', this.footerNode).getKnot();
        this.localesNode = new Query('.locales', this.footerNode).getKnot();
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
        const contentNode = new Query(
            '.page-content.fullscreen',
            this.templateViewNode,
        ).getKnot();
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
    hide(): void {
        this.footerNode.addClass('hidden');
        this.footerNode.removeClass('static');
        this.templateViewNode.removeClass('has-footer');
    }
    /**
     * @param {!Knot} contentNode
     * @return {undefined}
     */
    setContent(contentNode: Knot): void {
        this.contentNode.appendChild(contentNode);
    }
    /**
     * @return {!Knot}
     */
    getLocalesContainer(): Knot {
        return this.localesNode;
    }
    /**
     * @return {undefined}
     */
    open(): void {
        this.footerNode.addClass('open');
    }
    /**
     * @return {undefined}
     */
    close(): void {
        this.footerNode.removeClass('open');
    }
    /**
     * @return {boolean}
     */
    isOpened(): boolean {
        return this.footerNode.hasClass('open');
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
