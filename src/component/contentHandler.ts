import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';

/**
 * @class
 */
export class ContentHandler {
    containerKnot: Knot;
    options: Objekt;
    contentKnot: Knot;
    /**
     * @param {!Knot} containerKnot
     * @param {!Object=} opt_options
     */
    constructor(containerKnot: Knot, opt_options: Object | undefined = {}) {
        this.containerKnot = containerKnot;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            image_url: null,
            text: '',
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
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
    show(): void {
        this.contentKnot.addClass('visible-flex');
        this.containerKnot.addClass('hidden');
    }
    /**
     * @return {undefined}
     */
    hide(): void {
        this.contentKnot.removeClass('visible-flex');
        this.containerKnot.removeClass('hidden');
    }
}
