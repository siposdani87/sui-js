import { eq } from '../utils/operation';
import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Dialog } from './dialog';
import { Confirm } from './confirm';
import { Knot } from '../core';

type ProcessBar = {
    setProgress: (value: number) => void;
    setBuffer: (value: number) => void;
};

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

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            lock: false,
            counter: 0,
        });
        this.options.merge(opt_options);
    }

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

    lock(): void {
        this.options.set('lock', true);
    }

    unlock(): void {
        this.options.set('lock', false);
    }
}
