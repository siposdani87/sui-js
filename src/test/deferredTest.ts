import { BaseTest } from './baseTest';
import { Deferred } from '../core/deferred';
import { Promize } from '../core/promize';

/**
 * @class
 * @extends {BaseTest}
 */
export class DeferredTest extends BaseTest {
    ajaxResolve: () => any;
    funcResolve: () => any;
    ajaxReject: () => any;
    funcReject: () => any;
    /**
     *
     */
    constructor() {
        super('Deferred');
    }
    /**
     * @override
     * @return {undefined}
     */
    init(): void {
        this.ajaxResolve = () => {
            const deferred = new Deferred();
            window.setTimeout(() => {
                deferred.resolve(1);
            }, 100);
            return deferred.promise();
        };

        this.funcResolve = () => {
            const deferred = new Deferred();
            deferred.resolve(2);
            return deferred.promise();
        };

        this.ajaxReject = () => {
            const deferred = new Deferred();
            window.setTimeout(() => {
                deferred.reject(1);
            }, 100);
            return deferred.promise();
        };

        this.funcReject = () => {
            const deferred = new Deferred();
            deferred.reject(2);
            return deferred.promise();
        };

        this.testPromise();
        this.testResolve();
        this.testReject();
    }
    /**
     * @return {undefined}
     */
    testPromise(): void {
        const deferred = new Deferred();
        const promise = deferred.promise();
        this.showAssert(promise instanceof Promize, 'promise', 1);
    }
    /**
     * @return {undefined}
     */
    testResolve(): void {
        this.ajaxResolve().then(
            (value) => {
                this.showAssert(value === 1, 'resolve', 1);
            },
            () => {
                this.showAssert(false, 'resolve', 2);
            },
        );

        this.funcResolve().then(
            (value) => {
                this.showAssert(value === 2, 'resolve', 3);
            },
            () => {
                this.showAssert(false, 'resolve', 4);
            },
        );
    }
    /**
     * @return {undefined}
     */
    testReject(): void {
        this.ajaxReject().then(
            () => {
                this.showAssert(false, 'reject', 1);
            },
            (value) => {
                this.showAssert(value === 1, 'reject', 2);
            },
        );

        this.funcReject().then(
            () => {
                this.showAssert(false, 'reject', 3);
            },
            (value) => {
                this.showAssert(value === 2, 'reject', 4);
            },
        );
    }
}
