import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Dialog } from './dialog';
import { Confirm } from './confirm';
import { Knot } from '../core';
/**
 * Internal interface representing an MDL progress bar instance with
 * methods to set determinate progress and buffer values.
 */
type ProcessBar = {
    setProgress: (value: number) => void;
    setBuffer: (value: number) => void;
};
/**
 * Manages Material Design Lite progress bars across multiple application
 * containers: main content, header, dialog, and confirm window.
 *
 * The ProgressBar determines which container's bar to activate based on
 * the current state of {@link Dialog} and {@link Confirm} -- when a dialog
 * is open the dialog bar is shown, when a confirm is open the confirm bar
 * is shown, otherwise the main and header bars are shown.
 *
 * Display uses reference counting: each {@link show} call increments a
 * counter, and {@link hide} decrements it. The bars are only removed when
 * the counter reaches zero (or when forced). A {@link lock}/{@link unlock}
 * mechanism can suppress progress display entirely.
 *
 * @see {@link Dialog}
 * @see {@link Confirm}
 * @category Module
 *
 * @example
 * const progressBar = new ProgressBar(dialog, confirm);
 * progressBar.show();
 * // ... perform async work ...
 * progressBar.hide();
 *
 * @example
 * progressBar.setProgress(75);
 * progressBar.setBuffer(90);
 */
export declare class ProgressBar {
    dialog: Dialog;
    confirm: Confirm;
    options: Objekt;
    progressBarContainer: Knot;
    progressBarHeader: Knot;
    progressBarDialog: Knot;
    progressBarConfirm: Knot;
    async: Async;
    processContainer: ProcessBar;
    processHeader: ProcessBar;
    processDialog: ProcessBar;
    processConfirm: ProcessBar;
    progressValue: number;
    bufferValue: number;
    /**
     * Creates a new ProgressBar instance and initializes MDL progress bar
     * elements in all four containers.
     *
     * @param {Dialog} dialog - The application dialog instance used to
     *     determine which progress bar to display.
     * @param {Confirm} confirm - The application confirm instance used to
     *     determine which progress bar to display.
     * @param {object | undefined} opt_options - Optional configuration
     *     merged into defaults ({lock: false, counter: 0}).
     */
    constructor(dialog: Dialog, confirm: Confirm, opt_options?: object | undefined);
    /**
     * Merges user-provided options into the default configuration.
     *
     * @param {object | undefined} opt_options - Configuration overrides.
     */
    private _setOptions;
    /**
     * Queries all four progress bar DOM elements and sets up the async
     * upgrade listener for MDL MaterialProgress components.
     */
    private _init;
    /**
     * Initializes a single progress bar element by adding the MDL class
     * and registering an upgrade listener to capture the MaterialProgress
     * instance.
     *
     * @param {Knot} knot - The DOM wrapper for the progress bar element.
     * @returns {ProcessBar} A temporary ProcessBar that buffers values
     *     until the MDL component upgrades.
     */
    private _createProgressBar;
    /**
     * Routes a set of callbacks to the appropriate progress bar based on
     * the current dialog/confirm open state.
     *
     * @param {Function} containerCallback - Callback for the main container bar.
     * @param {Function} headerCallback - Callback for the header bar.
     * @param {Function} dialogCallback - Callback for the dialog bar.
     * @param {Function} confirmCallback - Callback for the confirm bar.
     */
    private _separateProgressBars;
    /**
     * Activates the MDL progress class on the appropriate bar(s) unless
     * the progress display is locked.
     */
    private _progress;
    /**
     * Activates the indeterminate progress animation on the appropriate bar(s)
     * and increments the reference counter.
     *
     * Each call to `show()` must be balanced by a call to {@link hide} to
     * ensure the progress bar is eventually hidden.
     *
     * @example
     * progressBar.show();
     * // ... perform async operation ...
     * progressBar.hide();
     */
    show(): void;
    /**
     * Sets a determinate progress value on the appropriate bar(s).
     *
     * @param {number} value - The progress percentage (0--100).
     *
     * @example
     * progressBar.setProgress(50); // 50% complete
     */
    setProgress(value: number): void;
    /**
     * Sets the buffer value on the appropriate progress bar(s). The buffer
     * represents how much data has been loaded ahead of the current progress.
     *
     * @param {number} value - The buffer percentage (0--100).
     *
     * @example
     * progressBar.setBuffer(80);
     */
    setBuffer(value: number): void;
    /**
     * Decrements the reference counter and hides all progress bars when the
     * counter reaches zero. If `opt_force` is true, the counter is reset to
     * zero and bars are hidden immediately.
     *
     * @param {boolean | undefined} opt_force - When true, force-hides all
     *     bars regardless of the current counter value.
     *
     * @example
     * progressBar.hide();       // decrements counter
     * progressBar.hide(true);   // force-hides immediately
     */
    hide(opt_force?: boolean): void;
    /**
     * Locks the progress bar, preventing any further progress display until
     * {@link unlock} is called. Existing indeterminate animations remain
     * visible but new activations are suppressed.
     *
     * @example
     * progressBar.lock();
     * progressBar.show(); // no visible effect
     */
    lock(): void;
    /**
     * Unlocks the progress bar, allowing progress display to resume.
     *
     * @example
     * progressBar.unlock();
     * progressBar.show(); // progress is visible again
     */
    unlock(): void;
}
export {};
