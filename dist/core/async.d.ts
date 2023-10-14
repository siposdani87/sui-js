export declare class Async {
    sum: number;
    call: {
        results: any[];
        counter: number;
        sum: number;
        isError: boolean;
    };
    constructor(opt_sum?: number);
    parallel(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<Object, Object>;
    parallelFunction(call: Function, opt_args?: Array<any>, opt_index?: number): void;
    private _parallelWrapper;
    private _parallelCaller;
    private _clear;
    setStatus(sum: number, isError: boolean, counter: number, results: Array<any>): void;
    eventComplete(isError: boolean, results: Array<any>): void;
    serial(calls: Array<Function>, opt_args?: Array<any>): import("./promize").Promize<Object, Object>;
    private _serialWrapper;
    private _serialCaller;
}
