import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BaseModal } from './baseModal';
/**
 * Image viewer modal that displays a single image in a full-screen
 * overlay. Extends {@link BaseModal} to provide a lightweight image
 * preview experience with an optional title.
 *
 * The viewer automatically opens when `loadImage()` is called, showing
 * the image in the modal body with the blur overlay applied to the
 * main container.
 *
 * @example
 * const viewer = new Viewer();
 * viewer.loadImage('/uploads/photo.jpg', 'Vacation Photo');
 *
 * @example
 * // Open without a title
 * viewer.loadImage('/uploads/chart.png');
 *
 * @see {@link BaseModal}
 * @see {@link Dialog}
 * @category Module
 */
export class Viewer extends BaseModal {
    /**
     * Creates a new Viewer instance.
     *
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the viewer element,
     *     defaults to `'#viewer'`).
     */
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
        this._initBase();
    }
    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            id: '#viewer',
        });
        this.options.merge(opt_options);
    }
    /**
     * Initializes DOM references for the viewer modal elements.
     */
    _init() {
        this.body = new Query('body').getKnot();
        this.modal = new Query(this.options.id, this.body).getKnot();
        this.modalWindow = new Query('#viewer-window', this.modal).getKnot();
        this.modalHeader = new Query('.modal-header', this.modal).getKnot();
        this.modalTitle = new Query('.modal-title', this.modalHeader).getKnot();
        this.modalBody = new Query('.modal-body', this.modal).getKnot();
        this.modalFooter = new Query('.modal-footer', this.modal).getKnot();
    }
    /**
     * Loads and displays an image in the viewer modal. Resets any
     * previous callbacks, creates an `<img>` element with the given
     * URL, sets the optional title, and opens the modal.
     *
     * @param imageUrl The URL of the image to display.
     * @param opt_title Optional title text shown in the modal header.
     *     When empty or omitted, the header is hidden.
     *
     * @example
     * viewer.loadImage('/api/images/12345.jpg', 'Product Preview');
     *
     * @example
     * // View an image without a title
     * viewer.loadImage('https://cdn.example.com/hero.png');
     */
    loadImage(imageUrl, opt_title = '') {
        this._reset();
        this._setImage(imageUrl);
        this._setTitle(opt_title);
        this.open();
    }
    /**
     * Creates an `<img>` element and appends it to the modal body.
     *
     * @param imageUrl The URL to set as the image source.
     */
    _setImage(imageUrl) {
        const imageKnot = new Knot('img');
        imageKnot.setAttribute('src', imageUrl);
        this.modalBody.appendChild(imageKnot);
    }
}
