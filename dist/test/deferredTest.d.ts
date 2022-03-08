import { BaseTest } from './baseTest';
/**
 * @class
 * @extends {BaseTest}
 */
export declare class DeferredTest extends BaseTest {
    ajaxResolve: () => any;
    funcResolve: () => any;
    ajaxReject: () => any;
    funcReject: () => any;
    /**
     *
     */
    constructor();
    /**
     * @override
     */
    init(): void;
    /**
     *
     */
    testPromise(): void;
    /**
     *
     */
    testResolve(): void;
    /**
     *
     */
    testReject(): void;
}
