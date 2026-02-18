import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * Full-screen loading spinner overlay using a Material Design Lite spinner
 * component.
 *
 * Display is reference-counted: each {@link show} call increments an internal
 * counter, and each {@link hide} call decrements it. The spinner is only
 * hidden when the counter reaches zero, ensuring that overlapping async
 * operations keep the loader visible until all of them complete.
 *
 * @see {@link ProgressBar}
 * @category Module
 *
 * @example
 * const loader = new Loader();
 * loader.show();
 * // ... perform async work ...
 * loader.hide();
 */
export class Loader {
    /**
     * Creates a new Loader instance, initializes the spinner element, and
     * appends it to the loader container in the DOM.
     *
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults ({counter: 0}).
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            counter: 0,
        });
        this.options.merge(opt_options);
    }
    /**
     * Creates the MDL spinner element and appends it to the `#loader`
     * container in the DOM.
     */
    _init() {
        this.loader = new Query('#loader').getKnot();
        this.spinner = this.loader.createElement('div');
        this.spinner.addClass([
            'mdl-spinner',
            'mdl-spinner--single-color',
            'mdl-js-spinner',
        ]);
        this.loader.appendChild(this.spinner);
    }
    /**
     * Displays the full-screen loader and activates the spinner animation.
     * Increments the internal reference counter.
     *
     * @example
     * loader.show();
     */
    show() {
        this.options.counter++;
        this.loader.removeClass('hidden');
        this.spinner.addClass('is-active');
    }
    /**
     * Decrements the reference counter and hides the loader when it reaches
     * zero. If `opt_force` is true, the counter is reset to zero and the
     * loader is hidden immediately.
     *
     * @param {boolean | undefined} opt_force - When true, force-hides the
     *     loader regardless of the current counter value.
     *
     * @example
     * loader.hide();        // decrements counter
     * loader.hide(true);    // force-hides immediately
     */
    hide(opt_force) {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.loader.addClass('hidden');
            this.spinner.removeClass('is-active');
        }
    }
}
