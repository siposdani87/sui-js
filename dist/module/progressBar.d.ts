import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Dialog } from './dialog';
import { Confirm } from './confirm';
import { Knot } from '../core';
/**
 * @typedef {{setProgress: function(number): undefined, setBuffer: function(number): undefined}} ProcessBar
 */
type ProcessBar = {
    setProgress: (value: number) => void;
    setBuffer: (value: number) => void;
};
/**
 * @class
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
    mProgressContainer: ProcessBar;
    mProgressHeader: ProcessBar;
    mProgressDialog: ProcessBar;
    mProgressConfirm: ProcessBar;
    progressValue: number;
    bufferValue: number;
    /**
     * @param {!Dialog} dialog
     * @param {!Confirm} confirm
     * @param {!Object=} opt_options
     */
    constructor(dialog: Dialog, confirm: Confirm, opt_options?: Object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @param {!Knot} knot
     * @return {!ProcessBar}
     */
    private _getProgressBar;
    /**
     * @private
     * @param {!Function} containerCallback
     * @param {!Function} headerCallback
     * @param {!Function} dialogCallback
     * @param {!Function} confirmCallback
     * @return {undefined}
     */
    private _separateProgressBars;
    /**
     * @private
     * @return {undefined}
     */
    private _progress;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @param {number} value
     * @return {undefined}
     */
    setProgress(value: number): void;
    /**
     * @param {number} value
     * @return {undefined}
     */
    setBuffer(value: number): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force?: boolean): void;
    /**
     * @return {undefined}
     */
    lock(): void;
    /**
     * @return {undefined}
     */
    unlock(): void;
}
export {};
