export declare class Waiter {
    timeoutWaiting: number;
    counter: number;
    intervall: number;
    constructor();
    advancedWaiting(callback: Function, opt_duration: number | undefined): void;
    private _advancedDelayHandler;
    stopAdvancedWaiting(): void;
    startAdvancedWaiting(): void;
    simpleWaiting(callback: Function, opt_duration: number | undefined): void;
    private _simpleDelayHandler;
}
