import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';

/**
 * @description "No content" placeholder handler that displays an image and/or text message
 * when a data container is empty, and hides itself when content is present.
 *
 * @example
 * const handler = new ContentHandler(containerKnot, { image_url: '/empty.svg', text: 'No items found' });
 * handler.show(); // Display placeholder
 * handler.hide(); // Hide placeholder, show container
 *
 * @see {@link Table} for table components that use ContentHandler
 * @see {@link CardCollection} for card components that use ContentHandler
 *
 * @category Component
 */
export class ContentHandler {
    containerKnot: Knot;
    options!: Objekt;
    contentKnot!: Knot;

    /**
     * @description Creates a new ContentHandler attached to a container element.
     * @param {Knot} containerKnot - The data container element to manage visibility for.
     * @param {object} [opt_options] - Configuration options (image_url, text).
     */
    constructor(containerKnot: Knot, opt_options: object | undefined = {}) {
        this.containerKnot = containerKnot;
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * @description Merges user options with defaults (image_url, text).
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            image_url: null,
            text: '',
        });
        this.options.merge(opt_options);
    }

    /**
     * @description Builds the placeholder DOM with optional image and text, then shows it.
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
     * @description Shows the placeholder and hides the data container.
     *
     * @example
     * if (items.length === 0) { handler.show(); }
     */
    show(): void {
        this.contentKnot.addClass('visible-flex');
        this.containerKnot.addClass('hidden');
    }

    /**
     * @description Hides the placeholder and shows the data container.
     *
     * @example
     * handler.hide();
     */
    hide(): void {
        this.contentKnot.removeClass('visible-flex');
        this.containerKnot.removeClass('hidden');
    }
}
