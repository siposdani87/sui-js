import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
export class ContentHandler {
    constructor(containerKnot, opt_options = {}) {
        this.containerKnot = containerKnot;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            image_url: null,
            text: '',
        });
        this.options.merge(opt_options);
    }
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
    show() {
        this.contentKnot.addClass('visible-flex');
        this.containerKnot.addClass('hidden');
    }
    hide() {
        this.contentKnot.removeClass('visible-flex');
        this.containerKnot.removeClass('hidden');
    }
}
