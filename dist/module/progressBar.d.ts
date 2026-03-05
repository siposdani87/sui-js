import { Objekt } from '../core/objekt';
import type { Dialog } from './dialog';
import type { Confirm } from './confirm';
import type { Knot } from '../core';
/**
 * Manages progress bars across multiple application containers: main content,
 * header, dialog, and confirm window.
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
 * Progress and buffer values are set via direct DOM width styling on inner
 * bar elements.
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
    barContainer: Knot;
    barHeader: Knot;
    barDialog: Knot;
    barConfirm: Knot;
    bufferContainer: Knot;
    bufferHeader: Knot;
    bufferDialog: Knot;
    bufferConfirm: Knot;
    /**
     * Creates a new ProgressBar instance and initializes progress bar
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
     * Queries all four progress bar DOM elements and creates inner bar
     * and buffer elements for direct width-based progress control.
     */
    private _init;
    /**
     * Creates an inner progress bar element inside the given container.
     *
     * @param {Knot} knot - The progress bar container.
     * @returns {Knot} The inner bar element.
     */
    private _createInnerBar;
    /**
     * Creates a buffer bar element inside the given container.
     *
     * @param {Knot} knot - The progress bar container.
     * @returns {Knot} The buffer bar element.
     */
    private _createBufferBar;
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
     * Activates the SUI progress class on the appropriate bar(s) unless
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
     * Sets a determinate progress value on the appropriate bar(s) by
     * setting the width of the inner bar element.
     *
     * @param {number} value - The progress percentage (0--100).
     *
     * @example
     * progressBar.setProgress(50); // 50% complete
     */
    setProgress(value: number): void;
    /**
     * Sets the buffer value on the appropriate progress bar(s) by setting
     * the width of the buffer bar element.
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
     * {@link unlock} is called.
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
