import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class ContentHandler {
    /**
     * @param {!Item} containerNode
     * @param {!Object=} opt_options
     */
    constructor(containerNode, opt_options = {}) {
        this.containerNode = containerNode;
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
            image_url: null,
            text: '',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.contentNode = new Item('div');
        this.contentNode.addClass('content-handler');
        this.containerNode.insertAfter(this.contentNode);
        if (this.options.image_url) {
            const imageNode = new Item('img');
            imageNode.setAttribute('src', this.options.image_url);
            this.contentNode.appendChild(imageNode);
        }
        if (this.options.text) {
            const textNode = new Item('p');
            textNode.setHtml(this.options.text);
            this.contentNode.appendChild(textNode);
        }
        this.show();
    }
    /**
     * @return {undefined}
     */
    show() {
        this.contentNode.addClass('visible-flex');
        this.containerNode.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.contentNode.removeClass('visible-flex');
        this.containerNode.removeClass('hidden');
    }
}