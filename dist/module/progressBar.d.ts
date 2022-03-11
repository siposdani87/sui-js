import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
import { Dialog } from './dialog';
import { Confirm } from './confirm';
import { Item } from '../core';
/**
 * @typedef {{setProgress: function(number): undefined, setBuffer: function(number): undefined}} ProcessBar
 */
declare type ProcessBar = {
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
    progressBarContainer: Item;
    progressBarHeader: Item;
    progressBarDialog: Item;
    progressBarConfirm: Item;
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
    constructor(dialog: Dialog, confirm: Confirm, opt_options?: object | undefined);
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @param {!Item} node
     * @return {!ProcessBar}
     */
    _getProgressBar(node: Item): ProcessBar;
    /**
     * @private
     * @param {!Function} containerCallback
     * @param {!Function} headerCallback
     * @param {!Function} dialogCallback
     * @param {!Function} confirmCallback
     * @return {undefined}
     */
    _separateProgressBars(containerCallback: Function, headerCallback: Function, dialogCallback: Function, confirmCallback: Function): void;
    /**
     * @private
     * @return {undefined}
     */
    _progress(): void;
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
