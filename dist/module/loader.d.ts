import { Objekt } from '../core/objekt';
import { Knot } from '../core';
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
export declare class Loader {
    options: Objekt;
    loader: Knot;
    spinner: Knot;
    /**
     * Creates a new Loader instance, initializes the spinner element, and
     * appends it to the loader container in the DOM.
     *
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults ({counter: 0}).
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    private _setOptions;
    /**
     * Creates the MDL spinner element and appends it to the `#loader`
     * container in the DOM.
     */
    private _init;
    /**
     * Displays the full-screen loader and activates the spinner animation.
     * Increments the internal reference counter.
     *
     * @example
     * loader.show();
     */
    show(): void;
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
    hide(opt_force?: boolean | undefined): void;
}
