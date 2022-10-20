import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';

/**
 * @class
 */
export class ContentHandler {
    containerNode: Knot;
    options: Objekt;
    contentNode: Knot;
    /**
     * @param {!Knot} containerNode
     * @param {!Object=} opt_options
     */
    constructor(containerNode: Knot, opt_options: Object | undefined = {}) {
        this.containerNode = containerNode;
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
            image_url: null,
            text: '',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.contentNode = new Knot('div');
        this.contentNode.addClass('content-handler');
        this.containerNode.insertAfter(this.contentNode);

        if (this.options.image_url) {
            const imageNode = new Knot('img');
            imageNode.setAttribute('src', this.options.image_url);
            this.contentNode.appendChild(imageNode);
        }
        if (this.options.text) {
            const textNode = new Knot('p');
            textNode.setHtml(this.options.text);
            this.contentNode.appendChild(textNode);
        }

        this.show();
    }
    /**
     * @return {undefined}
     */
    show(): void {
        this.contentNode.addClass('visible-flex');
        this.containerNode.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.contentNode.removeClass('visible-flex');
        this.containerNode.removeClass('hidden');
    }
}
