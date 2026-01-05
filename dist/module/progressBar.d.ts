import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Dialog } from './dialog';
import { Confirm } from './confirm';
import { Knot } from '../core';
type ProcessBar = {
    setProgress: (value: number) => void;
    setBuffer: (value: number) => void;
};
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
    constructor(dialog: Dialog, confirm: Confirm, opt_options?: object | undefined);
    private _setOptions;
    private _init;
    private _createProgressBar;
    private _separateProgressBars;
    private _progress;
    show(): void;
    setProgress(value: number): void;
    setBuffer(value: number): void;
    hide(opt_force?: boolean): void;
    lock(): void;
    unlock(): void;
}
export {};
