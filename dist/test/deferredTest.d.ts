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
     * @return {undefined}
     */
    init(): void;
    /**
     * @return {undefined}
     */
    testPromise(): void;
    /**
     * @return {undefined}
     */
    testResolve(): void;
    /**
     * @return {undefined}
     */
    testReject(): void;
}
