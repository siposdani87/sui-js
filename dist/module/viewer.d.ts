import { Objekt } from '../core/objekt';
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
export declare class Viewer extends BaseModal {
    options: Objekt;
    /**
     * Creates a new Viewer instance.
     *
     * @param opt_options Configuration options merged with defaults.
     *     Supported keys: `id` (CSS selector for the viewer element,
     *     defaults to `'#viewer'`).
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges user-provided options with default values.
     *
     * @param opt_options Configuration options to merge.
     */
    private _setOptions;
    /**
     * Initializes DOM references for the viewer modal elements.
     */
    private _init;
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
    loadImage(imageUrl: string, opt_title?: string | undefined): void;
    /**
     * Creates an `<img>` element and appends it to the modal body.
     *
     * @param imageUrl The URL to set as the image source.
     */
    private _setImage;
}
