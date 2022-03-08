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
     */
    init() {
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
     *
     */
    testPromise() {
        const deferred = new Deferred();
        const promise = deferred.promise();
        if (!(promise instanceof Promize)) {
            this.showError('promise', 1);
        }
    }
    /**
     *
     */
    testResolve() {
        this.ajaxResolve().then(
            (value) => {
                if (value !== 1) {
                    this.showError('resolve', 1);
                }
            },
            () => {
                this.showError('resolve', 2);
            },
        );

        this.funcResolve().then(
            (value) => {
                if (value !== 2) {
                    this.showError('resolve', 3);
                }
            },
            () => {
                this.showError('resolve', 4);
            },
        );
    }
    /**
     *
     */
    testReject() {
        this.ajaxReject().then(
            () => {
                this.showError('reject', 1);
            },
            (value) => {
                if (value !== 1) {
                    this.showError('reject', 2);
                }
            },
        );

        this.funcReject().then(
            () => {
                this.showError('reject', 3);
            },
            (value) => {
                if (value !== 2) {
                    this.showError('reject', 4);
                }
            },
        );
    }
}
