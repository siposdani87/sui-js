import { eq } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class ProgressBar {
    dialog: any;
    confirm: any;
    options: Objekt;
    progressBarContainer: any;
    progressBarHeader: any;
    progressBarDialog: any;
    progressBarConfirm: any;
    async: Async;
    mProgressContainer: any;
    mProgressHeader: any;
    mProgressDialog: any;
    mProgressConfirm: any;
    progressValue: any;
    bufferValue: any;
    /**
     * @param {!Dialog} dialog
     * @param {!Confirm} confirm
     * @param {!Object=} opt_options
     */
    constructor(dialog, confirm, opt_options = {}) {
        this.dialog = dialog;
        this.confirm = confirm;

        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            lock: false,
            counter: 0,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.progressBarContainer = new Query(
            '.main-container > .progress-bar',
        ).getItem();
        this.progressBarHeader = new Query('#header > .progress-bar').getItem();
        this.progressBarDialog = new Query(
            '#dialog-window > .progress-bar',
        ).getItem();
        this.progressBarConfirm = new Query(
            '#confirm-window > .progress-bar',
        ).getItem();

        this.async = new Async(4);
        this.async.eventComplete = (_isError, nodes) => {
            if (nodes[0]['MaterialProgress']) {
                this.mProgressContainer = nodes[0]['MaterialProgress'];
            }
            if (nodes[1]['MaterialProgress']) {
                this.mProgressHeader = nodes[1]['MaterialProgress'];
            }
            if (nodes[2]['MaterialProgress']) {
                this.mProgressDialog = nodes[2]['MaterialProgress'];
            }
            if (nodes[3]['MaterialProgress']) {
                this.mProgressConfirm = nodes[3]['MaterialProgress'];
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

        this.mProgressContainer = this._getProgressBar(
            this.progressBarContainer,
        );
        this.mProgressHeader = this._getProgressBar(this.progressBarHeader);
        this.mProgressDialog = this._getProgressBar(this.progressBarDialog);
        this.mProgressConfirm = this._getProgressBar(this.progressBarConfirm);
    }
    /**
     * @private
     * @param {!Item} node
     * @return {!Object}
     */
    _getProgressBar(node) {
        node.addClass('mdl-js-progress');

        node.addEventListener('mdl-componentupgraded', (node) => {
            this.async.parallelFunction(() => {
                return node;
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
     * @private
     * @param {!Function} containerCallback
     * @param {!Function} headerCallback
     * @param {!Function} dialogCallback
     * @param {!Function} confirmCallback
     * @return {undefined}
     */
    _separateProgressBars(
        containerCallback,
        headerCallback,
        dialogCallback,
        confirmCallback,
    ) {
        containerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        headerCallback(!this.dialog.isOpened() && !this.confirm.isOpened());
        dialogCallback(this.dialog.isOpened() && !this.confirm.isOpened());
        confirmCallback(this.confirm.isOpened());
    }
    /**
     * @private
     * @return {undefined}
     */
    _progress() {
        if (!this.options.get('lock')) {
            this._separateProgressBars(
                (condition) => {
                    if (condition) {
                        this.progressBarContainer.addClass('mdl-progress');
                    } else {
                        this.progressBarContainer.removeClass('mdl-progress');
                    }
                },
                (condition) => {
                    if (condition) {
                        this.progressBarHeader.addClass('mdl-progress');
                    } else {
                        this.progressBarHeader.removeClass('mdl-progress');
                    }
                },
                (condition) => {
                    if (condition) {
                        this.progressBarDialog.addClass('mdl-progress');
                    } else {
                        this.progressBarDialog.removeClass('mdl-progress');
                    }
                },
                (condition) => {
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
     * @return {undefined}
     */
    show() {
        this._progress();
        this.options.counter++;
        this._separateProgressBars(
            (condition) => {
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
            (condition) => {
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
            (condition) => {
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
            (condition) => {
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
     * @param {number} value
     * @return {undefined}
     */
    setProgress(value) {
        this._progress();
        this._separateProgressBars(
            (condition) => {
                if (condition) {
                    this.mProgressContainer.setProgress(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressHeader.setProgress(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressDialog.setProgress(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressConfirm.setProgress(value);
                }
            },
        );
    }
    /**
     * @param {number} value
     * @return {undefined}
     */
    setBuffer(value) {
        this._progress();
        this._separateProgressBars(
            (condition) => {
                if (condition) {
                    this.mProgressContainer.setBuffer(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressHeader.setBuffer(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressDialog.setBuffer(value);
                }
            },
            (condition) => {
                if (condition) {
                    this.mProgressConfirm.setBuffer(value);
                }
            },
        );
    }
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force) {
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
     * @return {undefined}
     */
    lock() {
        this.options.set('lock', true);
    }
    /**
     * @return {undefined}
     */
    unlock() {
        this.options.set('lock', false);
    }
}