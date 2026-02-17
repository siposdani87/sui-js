import { eq } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
export class ProgressBar {
    dialog: Dialog;
    confirm: Confirm;
    options!: Objekt;
    progressBarContainer!: Knot;
    progressBarHeader!: Knot;
    progressBarDialog!: Knot;
    progressBarConfirm!: Knot;
    async!: Async;
    processContainer!: ProcessBar;
    processHeader!: ProcessBar;
    processDialog!: ProcessBar;
    processConfirm!: ProcessBar;
    progressValue!: number;
    bufferValue!: number;

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
    constructor(
        dialog: Dialog,
        confirm: Confirm,
        opt_options: object | undefined = {},
    ) {
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
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            lock: false,
            counter: 0,
        });
        this.options.merge(opt_options);
    }

    /**
     * Queries all four progress bar DOM elements and sets up the async
     * upgrade listener for MDL MaterialProgress components.
     */
    private _init(): void {
        this.progressBarContainer = new Query(
            '.main-container > .progress-bar',
        ).getKnot();
        this.progressBarHeader = new Query('#header > .progress-bar').getKnot();
        this.progressBarDialog = new Query(
            '#dialog-window > .progress-bar',
        ).getKnot();
        this.progressBarConfirm = new Query(
            '#confirm-window > .progress-bar',
        ).getKnot();

        this.async = new Async(4);
        this.async.eventComplete = (_isError, nodes) => {
            if (nodes[0]['MaterialProgress']) {
                this.processContainer = nodes[0]['MaterialProgress'];
            }
            if (nodes[1]['MaterialProgress']) {
                this.processHeader = nodes[1]['MaterialProgress'];
            }
            if (nodes[2]['MaterialProgress']) {
                this.processDialog = nodes[2]['MaterialProgress'];
            }
            if (nodes[3]['MaterialProgress']) {
                this.processConfirm = nodes[3]['MaterialProgress'];
            }

            if (this.progressValue) {
                this.setProgress(this.progressValue);
            }
            this.progressValue = 0;

            if (this.bufferValue) {
                this.setBuffer(this.bufferValue);
            }
            this.bufferValue = 0;
        };

        this.progressValue = 0;
        this.bufferValue = 0;

        this.processContainer = this._createProgressBar(
            this.progressBarContainer,
        );
        this.processHeader = this._createProgressBar(this.progressBarHeader);
        this.processDialog = this._createProgressBar(this.progressBarDialog);
        this.processConfirm = this._createProgressBar(this.progressBarConfirm);
    }

    /**
     * Initializes a single progress bar element by adding the MDL class
     * and registering an upgrade listener to capture the MaterialProgress
     * instance.
     *
     * @param {Knot} knot - The DOM wrapper for the progress bar element.
     * @returns {ProcessBar} A temporary ProcessBar that buffers values
     *     until the MDL component upgrades.
     */
    private _createProgressBar(knot: Knot): ProcessBar {
        knot.addClass('mdl-js-progress');

        knot.addEventListener('mdl-componentupgraded', (knot) => {
            this.async.parallelFunction(() => {
                return knot;
            });
        });

        return {
            setProgress: (value) => {
                this.progressValue = value;
            },
            setBuffer: (value) => {
                this.bufferValue = value;
            },
        };
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
    private _separateProgressBars(
        containerCallback: (condition: boolean) => void,
        headerCallback: (condition: boolean) => void,
        dialogCallback: (condition: boolean) => void,
        confirmCallback: (condition: boolean) => void,
    ): void {
        containerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        headerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        dialogCallback(this.dialog.isOpened() && !this.confirm.isOpened());
        confirmCallback(this.confirm.isOpened());
    }

    /**
     * Activates the MDL progress class on the appropriate bar(s) unless
     * the progress display is locked.
     */
    private _progress(): void {
        if (!this.options.get('lock')) {
            this._separateProgressBars(
                (condition: boolean) => {
                    if (condition) {
                        this.progressBarContainer.addClass('mdl-progress');
                    } else {
                        this.progressBarContainer.removeClass('mdl-progress');
                    }
                },
                (condition: boolean) => {
                    if (condition) {
                        this.progressBarHeader.addClass('mdl-progress');
                    } else {
                        this.progressBarHeader.removeClass('mdl-progress');
                    }
                },
                (condition: boolean) => {
                    if (condition) {
                        this.progressBarDialog.addClass('mdl-progress');
                    } else {
                        this.progressBarDialog.removeClass('mdl-progress');
                    }
                },
                (condition: boolean) => {
                    if (condition) {
                        this.progressBarConfirm.addClass('mdl-progress');
                    } else {
                        this.progressBarConfirm.removeClass('mdl-progress');
                    }
                },
            );
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
    show(): void {
        this._progress();
        this.options.counter++;
        this._separateProgressBars(
            (condition: boolean) => {
                if (condition) {
                    this.progressBarContainer.addClass(
                        'mdl-progress__indeterminate',
                    );
                } else {
                    this.progressBarContainer.removeClass(
                        'mdl-progress__indeterminate',
                    );
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.progressBarHeader.addClass(
                        'mdl-progress__indeterminate',
                    );
                } else {
                    this.progressBarHeader.removeClass(
                        'mdl-progress__indeterminate',
                    );
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.progressBarDialog.addClass(
                        'mdl-progress__indeterminate',
                    );
                } else {
                    this.progressBarDialog.removeClass(
                        'mdl-progress__indeterminate',
                    );
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.progressBarConfirm.addClass(
                        'mdl-progress__indeterminate',
                    );
                } else {
                    this.progressBarConfirm.removeClass(
                        'mdl-progress__indeterminate',
                    );
                }
            },
        );
    }

    /**
     * Sets a determinate progress value on the appropriate bar(s).
     *
     * @param {number} value - The progress percentage (0--100).
     *
     * @example
     * progressBar.setProgress(50); // 50% complete
     */
    setProgress(value: number): void {
        this._progress();
        this._separateProgressBars(
            (condition: boolean) => {
                if (condition) {
                    this.processContainer.setProgress(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processHeader.setProgress(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processDialog.setProgress(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processConfirm.setProgress(value);
                }
            },
        );
    }

    /**
     * Sets the buffer value on the appropriate progress bar(s). The buffer
     * represents how much data has been loaded ahead of the current progress.
     *
     * @param {number} value - The buffer percentage (0--100).
     *
     * @example
     * progressBar.setBuffer(80);
     */
    setBuffer(value: number): void {
        this._progress();
        this._separateProgressBars(
            (condition: boolean) => {
                if (condition) {
                    this.processContainer.setBuffer(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processHeader.setBuffer(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processDialog.setBuffer(value);
                }
            },
            (condition: boolean) => {
                if (condition) {
                    this.processConfirm.setBuffer(value);
                }
            },
        );
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
    hide(opt_force?: boolean): void {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.progressBarContainer.removeClass([
                'mdl-progress',
                'mdl-progress__indeterminate',
            ]);
            this.progressBarHeader.removeClass([
                'mdl-progress',
                'mdl-progress__indeterminate',
            ]);
            this.progressBarDialog.removeClass([
                'mdl-progress',
                'mdl-progress__indeterminate',
            ]);
            this.progressBarConfirm.removeClass([
                'mdl-progress',
                'mdl-progress__indeterminate',
            ]);
        }
    }

    /**
     * Locks the progress bar, preventing any further progress display until
     * {@link unlock} is called. Existing indeterminate animations remain
     * visible but new activations are suppressed.
     *
     * @example
     * progressBar.lock();
     * progressBar.show(); // no visible effect
     */
    lock(): void {
        this.options.set('lock', true);
    }

    /**
     * Unlocks the progress bar, allowing progress display to resume.
     *
     * @example
     * progressBar.unlock();
     * progressBar.show(); // progress is visible again
     */
    unlock(): void {
        this.options.set('lock', false);
    }
}
