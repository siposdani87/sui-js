import { Promize } from './promize';
/**
 * @class
 */
export declare class Async {
    sum: number;
    call: any;
    /**
     * @param {number=} opt_sum
     */
    constructor(opt_sum?: number);
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    parallel(calls: Array<Function>, opt_args?: Array<any>): Promize;
    /**
     * @param {!Function} call
     * @param {?Array=} opt_args
     * @param {number=} opt_index
     * @return {undefined}
     */
    parallelFunction(call: Function, opt_args?: Array<any>, opt_index?: number): void;
    /**
     * @private
     * @param {!Function} call
     * @param {number} length
     * @param {boolean} allowEvent
     * @param {number} index
     * @param {?Array=} opt_args
     * @return {!Promize}
     */
    _parallelWrapper(call: Function, length: number, allowEvent: boolean, index: number, opt_args?: Array<any>): Promize;
    /**
     * @private
     * @param {number|undefined} length
     * @param {boolean} isError
     * @param {*} result
     * @param {boolean} allowEvent
     * @param {number} index
     * @param {?Array=} opt_args
     * @return {!Promize}
     */
    _parallelCaller(length: number | undefined, isError: boolean, result: any, allowEvent: boolean, index: number, opt_args?: Array<any>): Promize;
    /**
     * @private
     * @return {undefined}
     */
    private _clear;
    /**
     * @param {number} sum
     * @param {boolean} isError
     * @param {number} counter
     * @param {!Array} results
     * @return {undefined}
     */
    setStatus(sum: number, isError: boolean, counter: number, results: Array<any>): void;
    /**
     * @param {boolean} isError
     * @param {!Array} results
     * @return {undefined}
     */
    eventComplete(isError: boolean, results: Array<any>): void;
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    serial(calls: Array<Function>, opt_args?: Array<any>): Promize;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialWrapper(calls: Array<Function>, index: number, opt_args?: Array<any>): Promize;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {*} result
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialCaller(calls: Array<Function>, index: number, result: any, opt_args?: Array<any>): Promize;
}
