import { Async } from '../core/async';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ProgressBar {
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
    constructor(dialog: any, confirm: any, opt_options?: {});
    /**
     * @param {!Object=} opt_options
     * @private
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @param {!Item} node
     * @return {!Object}
     */
    _getProgressBar(node: any): {
        setProgress: (value: any) => void;
        setBuffer: (value: any) => void;
    };
    /**
     * @private
     * @param {!Function} containerCallback
     * @param {!Function} headerCallback
     * @param {!Function} dialogCallback
     * @param {!Function} confirmCallback
     * @return {undefined}
     */
    _separateProgressBars(containerCallback: any, headerCallback: any, dialogCallback: any, confirmCallback: any): void;
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
    setProgress(value: any): void;
    /**
     * @param {number} value
     * @return {undefined}
     */
    setBuffer(value: any): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force: any): void;
    /**
     * @return {undefined}
     */
    lock(): void;
    /**
     * @return {undefined}
     */
    unlock(): void;
}
