import { Promize } from './promize';
import { Deferred } from './deferred';

describe('Promize', () => {
    it('should be instance of Promize', () => {
        const promize = new Promize();
        expect(promize).toBeInstanceOf(Promize);
    });

    describe('resolve', () => {
        it('should resolve with a value and call resolve handler', () => {
            const promize = new Promize<any>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.then(onResolve, onReject);
            promize.resolve(42 as any);

            expect(onResolve).toHaveBeenCalledWith(42);
            expect(onReject).not.toHaveBeenCalled();
        });

        it('should call then handler when already resolved (pre-resolved)', () => {
            const promize = new Promize<number>();
            const onResolve = jest.fn();

            promize.resolve(10);
            promize.then(onResolve);

            expect(onResolve).toHaveBeenCalledWith(10);
        });
    });

    describe('reject', () => {
        it('should reject with a reason and call reject handler', () => {
            const promize = new Promize();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.then(onResolve, onReject);
            promize.reject('error' as any);

            expect(onReject).toHaveBeenCalledWith('error');
            expect(onResolve).not.toHaveBeenCalled();
        });

        it('should call reject handler when already rejected (pre-rejected)', () => {
            const promize = new Promize<number, string>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.reject('fail' as any);
            promize.then(onResolve, onReject);

            expect(onReject).toHaveBeenCalledWith('fail');
            expect(onResolve).not.toHaveBeenCalled();
        });
    });

    describe('complete handler', () => {
        it('should call complete handler after resolve', () => {
            const promize = new Promize<number>();
            const onResolve = jest.fn();
            const onComplete = jest.fn();

            promize.then(onResolve, jest.fn(), onComplete);
            promize.resolve(7);

            expect(onResolve).toHaveBeenCalledWith(7);
            expect(onComplete).toHaveBeenCalledWith(7);
        });

        it('should call complete handler after reject', () => {
            const promize = new Promize<number, number>();
            const onReject = jest.fn();
            const onComplete = jest.fn();

            promize.then(jest.fn(), onReject, onComplete);
            promize.reject(9);

            expect(onReject).toHaveBeenCalledWith(9);
            expect(onComplete).toHaveBeenCalledWith(9);
        });
    });

    describe('defer', () => {
        it('should defer resolution to another Deferred', () => {
            const promize = new Promize();
            const deferred = new Deferred();
            const onResolve = jest.fn();

            deferred.promise().then(onResolve);
            promize.defer(deferred as any);
            promize.resolve(99 as any);

            expect(onResolve).toHaveBeenCalled();
        });
    });
});
