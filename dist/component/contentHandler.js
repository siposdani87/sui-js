import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class ContentHandler {
    /**
     * @param {!Knot} containerKnot
     * @param {!Object=} opt_options
     */
    constructor(containerKnot, opt_options = {}) {
        this.containerKnot = containerKnot;
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
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content-handler');
        this.containerKnot.insertAfter(this.contentKnot);
        if (this.options.image_url) {
            const imageKnot = new Knot('img');
            imageKnot.setAttribute('src', this.options.image_url);
            this.contentKnot.appendChild(imageKnot);
        }
        if (this.options.text) {
            const textKnot = new Knot('p');
            textKnot.setHtml(this.options.text);
            this.contentKnot.appendChild(textKnot);
        }
        this.show();
    }
    /**
     * @return {undefined}
     */
    show() {
        this.contentKnot.addClass('visible-flex');
        this.containerKnot.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide() {
        this.contentKnot.removeClass('visible-flex');
        this.containerKnot.removeClass('hidden');
    }
}
