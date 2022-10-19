import { Deferred } from './deferred';
import { Promize } from './promize';

describe('deferred', () => {
    it('should be instance of Deferred', () => {
        const deferred = new Deferred();

        expect(deferred).toBeInstanceOf(Deferred);
    });

    it('promise', () => {
        const deferred = new Deferred();
        const promise = deferred.promise();

        expect(promise).toBeInstanceOf(Promize);
    });

    it('ajaxResolve', () => {
        const ajaxResolve = () => {
            const deferred = new Deferred();
            window.setTimeout(() => {
                deferred.resolve(1);
            }, 100);
            return deferred.promise();
        };

        ajaxResolve().then(
            (value) => {
                expect(value).toBe(1);
            },
            () => {
                expect(true).toBe(false);
            },
        );
    });

    it('funcResolve', () => {
        const funcResolve = () => {
            const deferred = new Deferred();
            deferred.resolve(2);
            return deferred.promise();
        };

        funcResolve().then(
            (value) => {
                expect(value).toBe(2);
            },
            () => {
                expect(true).toBe(false);
            },
        );
    });

    it('ajaxReject', () => {
        const ajaxReject = () => {
            const deferred = new Deferred();
            window.setTimeout(() => {
                deferred.reject(1);
            }, 100);
            return deferred.promise();
        };

        ajaxReject().then(
            () => {
                expect(true).toBe(false);
            },
            (value) => {
                expect(value).toBe(1);
            },
        );
    });

    it('funcReject', () => {
        const funcReject = () => {
            const deferred = new Deferred();
            deferred.reject(2);
            return deferred.promise();
        };

        funcReject().then(
            () => {
                expect(true).toBe(false);
            },
            (value) => {
                expect(value).toBe(2);
            },
        );
    });
});
