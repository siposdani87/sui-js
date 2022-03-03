/**
 * @class
 */
export declare class Async {
    sum: any;
    call: any;
    /**
     * @param {number=} opt_sum
     */
    constructor(opt_sum?: any);
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    parallel(calls: any, opt_args: any): import("./promize").Promize;
    /**
     * @param {!Function} call
     * @param {?Array=} opt_args
     * @param {number=} opt_index
     * @return {undefined}
     */
    parallelFunction(call: any, opt_args?: any, opt_index?: any): void;
    /**
     * @private
     * @param {!Function} call
     * @param {number} length
     * @param {boolean} allowEvent
     * @param {number} index
     * @param {?Array=} opt_args
     * @return {!Promize}
     */
    _parallelWrapper(call: any, length: any, allowEvent: any, index: any, opt_args?: any): import("./promize").Promize;
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
    _parallelCaller(length: any, isError: any, result: any, allowEvent: any, index: any, opt_args?: any): import("./promize").Promize;
    /**
     * @private
     * @return {undefined}
     */
    _clear(): void;
    /**
     * @param {number} sum
     * @param {boolean} isError
     * @param {number} counter
     * @param {!Array} results
     * @return {undefined}
     */
    setStatus(sum: any, isError: any, counter: any, results: any): void;
    /**
     * @param {boolean} isError
     * @param {!Array} results
     * @return {undefined}
     */
    eventComplete(isError: any, results: any): void;
    /**
     * @param {!Array<!Function>} calls
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    serial(calls: any, opt_args?: any): import("./promize").Promize;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialWrapper(calls: any, index: any, opt_args?: any): import("./promize").Promize;
    /**
     * @private
     * @param {!Array<!Function>} calls
     * @param {number} index
     * @param {*} result
     * @param {!Array=} opt_args
     * @return {!Promize}
     */
    _serialCaller(calls: any, index: any, result: any, opt_args?: any): import("./promize").Promize;
}
