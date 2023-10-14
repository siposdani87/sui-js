/**
 * @class
 */
export declare class Async {
    sum: number;
    call: {
        results: any[];
        counter: number;
        sum: number;
        isError: boolean;
    };
    /**
     * @param {number=} opt_sum
     */
    constructor(opt_sum?: number);
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    parallel(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<Object, Object>;
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
    private _parallelWrapper;
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
    private _parallelCaller;
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
    serial(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<Object, Object>;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    private _serialWrapper;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {*} result
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    private _serialCaller;
}
