import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
export class ProgressBar {
    dialog: Dialog;
    confirm: Confirm;
    options!: Objekt;
    progressBarContainer!: Knot;
    progressBarHeader!: Knot;
    progressBarDialog!: Knot;
    progressBarConfirm!: Knot;
    barContainer!: Knot;
    barHeader!: Knot;
    barDialog!: Knot;
    barConfirm!: Knot;
    bufferContainer!: Knot;
    bufferHeader!: Knot;
    bufferDialog!: Knot;
    bufferConfirm!: Knot;

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
     * Queries all four progress bar DOM elements and creates inner bar
     * and buffer elements for direct width-based progress control.
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
    private _createInnerBar(knot: Knot): Knot {
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
    private _createBufferBar(knot: Knot): Knot {
        const buffer = knot.createElement('div');
        buffer.addClass('sui-progress__buffer');
        knot.appendChild(buffer);
        return buffer;
    }

    /**
     * Returns the progress bar containers paired with their visibility
     * conditions based on the current dialog/confirm open state.
     *
     * @returns {Array<[Knot, boolean]>} Pairs of progress bar knots and
     *     whether they should be active.
     */
    private _getProgressBarConditions(): [Knot, boolean][] {
        const isDefault =
            !this.dialog.isOpened() && !this.confirm.isOpened();
        const isDialog =
            this.dialog.isOpened() && !this.confirm.isOpened();
        const isConfirm = this.confirm.isOpened();

        return [
            [this.progressBarContainer, isDefault],
            [this.progressBarHeader, isDefault],
            [this.progressBarDialog, isDialog],
            [this.progressBarConfirm, isConfirm],
        ];
    }

    /**
     * Toggles a CSS class on each progress bar based on its visibility
     * condition.
     *
     * @param {string} cssClass - The CSS class to toggle.
     */
    private _toggleProgressBarClass(cssClass: string): void {
        for (const [knot, condition] of this._getProgressBarConditions()) {
            if (condition) {
                knot.addClass(cssClass);
            } else {
                knot.removeClass(cssClass);
            }
        }
    }

    /**
     * Activates the SUI progress class on the appropriate bar(s) unless
     * the progress display is locked.
     */
    private _progress(): void {
        if (!this.options.get('lock')) {
            this._toggleProgressBarClass('sui-progress');
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
        this._toggleProgressBarClass('sui-progress--indeterminate');
    }

    /**
     * Applies a callback to the bar or buffer elements whose parent
     * progress bar is active based on the current dialog/confirm state.
     *
     * @param {Knot[]} elements - The inner bar or buffer elements
     *     corresponding to container, header, dialog, and confirm.
     * @param {(knot: Knot) => void} callback - Action to perform on
     *     each active element.
     */
    private _applyToActiveBars(
        elements: Knot[],
        callback: (knot: Knot) => void,
    ): void {
        const conditions = this._getProgressBarConditions();
        for (let i = 0; i < conditions.length; i++) {
            const [, condition] = conditions[i]!;
            if (condition) {
                callback(elements[i]!);
            }
        }
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
    setProgress(value: number): void {
        this._progress();
        this._applyToActiveBars(
            [this.barContainer, this.barHeader, this.barDialog, this.barConfirm],
            (bar) => {
                bar.setStyle({ width: value + '%' });
            },
        );
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
    setBuffer(value: number): void {
        this._progress();
        this._applyToActiveBars(
            [
                this.bufferContainer,
                this.bufferHeader,
                this.bufferDialog,
                this.bufferConfirm,
            ],
            (buffer) => {
                buffer.setStyle({ width: value + '%' });
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
