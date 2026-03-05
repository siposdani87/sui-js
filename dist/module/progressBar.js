import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
export class ProgressBar {
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
    constructor(dialog, confirm, opt_options = {}) {
        this.dialog = dialog;
        this.confirm = confirm;
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
            lock: false,
            counter: 0,
        });
        this.options.merge(opt_options);
    }
    /**
     * Queries all four progress bar DOM elements and creates inner bar
     * and buffer elements for direct width-based progress control.
     */
    _init() {
        this.progressBarContainer = new Query('.main-container > .progress-bar').getKnot();
        this.progressBarHeader = new Query('#header > .progress-bar').getKnot();
        this.progressBarDialog = new Query('#dialog-window > .progress-bar').getKnot();
        this.progressBarConfirm = new Query('#confirm-window > .progress-bar').getKnot();
        this.barContainer = this._createInnerBar(this.progressBarContainer);
        this.barHeader = this._createInnerBar(this.progressBarHeader);
        this.barDialog = this._createInnerBar(this.progressBarDialog);
        this.barConfirm = this._createInnerBar(this.progressBarConfirm);
        this.bufferContainer = this._createBufferBar(this.progressBarContainer);
        this.bufferHeader = this._createBufferBar(this.progressBarHeader);
        this.bufferDialog = this._createBufferBar(this.progressBarDialog);
        this.bufferConfirm = this._createBufferBar(this.progressBarConfirm);
    }
    /**
     * Creates an inner progress bar element inside the given container.
     *
     * @param {Knot} knot - The progress bar container.
     * @returns {Knot} The inner bar element.
     */
    _createInnerBar(knot) {
        const bar = knot.createElement('div');
        bar.addClass('sui-progress__bar');
        knot.appendChild(bar);
        return bar;
    }
    /**
     * Creates a buffer bar element inside the given container.
     *
     * @param {Knot} knot - The progress bar container.
     * @returns {Knot} The buffer bar element.
     */
    _createBufferBar(knot) {
        const buffer = knot.createElement('div');
        buffer.addClass('sui-progress__buffer');
        knot.appendChild(buffer);
        return buffer;
    }
    /**
     * Routes a set of callbacks to the appropriate progress bar based on
     * the current dialog/confirm open state.
     *
     * @param {Function} containerCallback - Callback for the main container bar.
     * @param {Function} headerCallback - Callback for the header bar.
     * @param {Function} dialogCallback - Callback for the dialog bar.
     * @param {Function} confirmCallback - Callback for the confirm bar.
     */
    _separateProgressBars(containerCallback, headerCallback, dialogCallback, confirmCallback) {
        containerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        headerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        dialogCallback(this.dialog.isOpened() && !this.confirm.isOpened());
        confirmCallback(this.confirm.isOpened());
    }
    /**
     * Activates the SUI progress class on the appropriate bar(s) unless
     * the progress display is locked.
     */
    _progress() {
        if (!this.options.get('lock')) {
            this._separateProgressBars((condition) => {
                if (condition) {
                    this.progressBarContainer.addClass('sui-progress');
                }
                else {
                    this.progressBarContainer.removeClass('sui-progress');
                }
            }, (condition) => {
                if (condition) {
                    this.progressBarHeader.addClass('sui-progress');
                }
                else {
                    this.progressBarHeader.removeClass('sui-progress');
                }
            }, (condition) => {
                if (condition) {
                    this.progressBarDialog.addClass('sui-progress');
                }
                else {
                    this.progressBarDialog.removeClass('sui-progress');
                }
            }, (condition) => {
                if (condition) {
                    this.progressBarConfirm.addClass('sui-progress');
                }
                else {
                    this.progressBarConfirm.removeClass('sui-progress');
                }
            });
        }
    }
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
    show() {
        this._progress();
        this.options.counter++;
        this._separateProgressBars((condition) => {
            if (condition) {
                this.progressBarContainer.addClass('sui-progress--indeterminate');
            }
            else {
                this.progressBarContainer.removeClass('sui-progress--indeterminate');
            }
        }, (condition) => {
            if (condition) {
                this.progressBarHeader.addClass('sui-progress--indeterminate');
            }
            else {
                this.progressBarHeader.removeClass('sui-progress--indeterminate');
            }
        }, (condition) => {
            if (condition) {
                this.progressBarDialog.addClass('sui-progress--indeterminate');
            }
            else {
                this.progressBarDialog.removeClass('sui-progress--indeterminate');
            }
        }, (condition) => {
            if (condition) {
                this.progressBarConfirm.addClass('sui-progress--indeterminate');
            }
            else {
                this.progressBarConfirm.removeClass('sui-progress--indeterminate');
            }
        });
    }
    /**
     * Sets a determinate progress value on the appropriate bar(s) by
     * setting the width of the inner bar element.
     *
     * @param {number} value - The progress percentage (0--100).
     *
     * @example
     * progressBar.setProgress(50); // 50% complete
     */
    setProgress(value) {
        this._progress();
        this._separateProgressBars((condition) => {
            if (condition) {
                this.barContainer.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.barHeader.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.barDialog.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.barConfirm.setStyle({ width: value + '%' });
            }
        });
    }
    /**
     * Sets the buffer value on the appropriate progress bar(s) by setting
     * the width of the buffer bar element.
     *
     * @param {number} value - The buffer percentage (0--100).
     *
     * @example
     * progressBar.setBuffer(80);
     */
    setBuffer(value) {
        this._progress();
        this._separateProgressBars((condition) => {
            if (condition) {
                this.bufferContainer.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.bufferHeader.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.bufferDialog.setStyle({ width: value + '%' });
            }
        }, (condition) => {
            if (condition) {
                this.bufferConfirm.setStyle({ width: value + '%' });
            }
        });
    }
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
    hide(opt_force) {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.progressBarContainer.removeClass([
                'sui-progress',
                'sui-progress--indeterminate',
            ]);
            this.progressBarHeader.removeClass([
                'sui-progress',
                'sui-progress--indeterminate',
            ]);
            this.progressBarDialog.removeClass([
                'sui-progress',
                'sui-progress--indeterminate',
            ]);
            this.progressBarConfirm.removeClass([
                'sui-progress',
                'sui-progress--indeterminate',
            ]);
        }
    }
    /**
     * Locks the progress bar, preventing any further progress display until
     * {@link unlock} is called.
     *
     * @example
     * progressBar.lock();
     * progressBar.show(); // no visible effect
     */
    lock() {
        this.options.set('lock', true);
    }
    /**
     * Unlocks the progress bar, allowing progress display to resume.
     *
     * @example
     * progressBar.unlock();
     * progressBar.show(); // progress is visible again
     */
    unlock() {
        this.options.set('lock', false);
    }
}
