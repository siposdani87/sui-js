import { Deferred } from './deferred';
import { Promize } from './promize';

describe('Deferred', () => {
    it('should be instance of Deferred', () => {
        const deferred = new Deferred();

        expect(deferred).toBeInstanceOf(Deferred);
    });

    it('should return a Promize from promise()', () => {
        const deferred = new Deferred();
        const promise = deferred.promise();

        expect(promise).toBeInstanceOf(Promize);
    });

    describe('resolve', () => {
        it('should resolve synchronously and call resolve handler', () => {
            const deferred = new Deferred<number, number>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            deferred.promise().then(onResolve, onReject);
            deferred.resolve(2);

            expect(onResolve).toHaveBeenCalledWith(2);
            expect(onReject).not.toHaveBeenCalled();
        });

        it('should resolve before then is called (pre-resolved)', () => {
            const deferred = new Deferred<number, number>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            deferred.resolve(1);
            deferred.promise().then(onResolve, onReject);

            expect(onResolve).toHaveBeenCalledWith(1);
            expect(onReject).not.toHaveBeenCalled();
        });
    });

    describe('reject', () => {
        it('should reject synchronously and call reject handler', () => {
            const deferred = new Deferred<number, number>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            deferred.promise().then(onResolve, onReject);
            deferred.reject(1);

            expect(onReject).toHaveBeenCalledWith(1);
            expect(onResolve).not.toHaveBeenCalled();
        });

        it('should reject before then is called (pre-rejected)', () => {
            const deferred = new Deferred<number, number>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            deferred.reject(2);
            deferred.promise().then(onResolve, onReject);

            expect(onReject).toHaveBeenCalledWith(2);
            expect(onResolve).not.toHaveBeenCalled();
        });
    });

    describe('complete handler', () => {
        it('should call complete handler after resolve', () => {
            const deferred = new Deferred<number, number>();
            const onResolve = jest.fn();
            const onComplete = jest.fn();

            deferred.promise().then(onResolve, jest.fn(), onComplete);
            deferred.resolve(5);

            expect(onResolve).toHaveBeenCalledWith(5);
            expect(onComplete).toHaveBeenCalledWith(5);
        });

        it('should call complete handler after reject', () => {
            const deferred = new Deferred<number, number>();
            const onReject = jest.fn();
            const onComplete = jest.fn();

            deferred.promise().then(jest.fn(), onReject, onComplete);
            deferred.reject(3);

            expect(onReject).toHaveBeenCalledWith(3);
            expect(onComplete).toHaveBeenCalledWith(3);
        });
    });
});
