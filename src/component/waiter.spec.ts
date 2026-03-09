import { Waiter } from './waiter';

describe('Waiter', () => {
    let waiter: Waiter;

    beforeEach(() => {
        jest.useFakeTimers();
        waiter = new Waiter();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should be instance of Waiter', () => {
        expect(waiter).toBeInstanceOf(Waiter);
    });

    it('should initialize with zero counters', () => {
        expect(waiter.timeoutWaiting).toBe(0);
        expect(waiter.counter).toBe(0);
    });

    describe('advancedWaiting', () => {
        it('should call callback after duration', () => {
            const cb = jest.fn();
            waiter.advancedWaiting(cb, 500);
            expect(cb).not.toHaveBeenCalled();
            jest.advanceTimersByTime(500);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should use default duration of 3000ms', () => {
            const cb = jest.fn();
            waiter.advancedWaiting(cb, undefined);
            jest.advanceTimersByTime(2999);
            expect(cb).not.toHaveBeenCalled();
            jest.advanceTimersByTime(1);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should only fire last callback when called rapidly', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            waiter.advancedWaiting(cb1, 500);
            waiter.advancedWaiting(cb2, 500);
            jest.advanceTimersByTime(500);
            expect(cb1).not.toHaveBeenCalled();
            expect(cb2).toHaveBeenCalledTimes(1);
        });

        it('should reset timeoutWaiting to 0 after callback fires', () => {
            const cb = jest.fn();
            waiter.advancedWaiting(cb, 100);
            jest.advanceTimersByTime(100);
            expect(waiter.timeoutWaiting).toBe(0);
        });
    });

    describe('simpleWaiting', () => {
        it('should call callback after duration', () => {
            const cb = jest.fn();
            waiter.simpleWaiting(cb, 500);
            expect(cb).not.toHaveBeenCalled();
            jest.advanceTimersByTime(500);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should use default duration of 3000ms', () => {
            const cb = jest.fn();
            waiter.simpleWaiting(cb, undefined);
            jest.advanceTimersByTime(2999);
            expect(cb).not.toHaveBeenCalled();
            jest.advanceTimersByTime(1);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should only fire last callback when called rapidly', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            waiter.simpleWaiting(cb1, 500);
            waiter.simpleWaiting(cb2, 500);
            jest.advanceTimersByTime(500);
            expect(cb1).not.toHaveBeenCalled();
            expect(cb2).toHaveBeenCalledTimes(1);
        });

        it('should reset counter to 0 after callback fires', () => {
            const cb = jest.fn();
            waiter.simpleWaiting(cb, 100);
            jest.advanceTimersByTime(100);
            expect(waiter.counter).toBe(0);
        });
    });

    describe('stopAdvancedWaiting / startAdvancedWaiting', () => {
        it('should prevent pending callback from firing', () => {
            const cb = jest.fn();
            waiter.advancedWaiting(cb, 500);
            waiter.stopAdvancedWaiting();
            jest.advanceTimersByTime(500);
            expect(cb).not.toHaveBeenCalled();
        });

        it('should increment timeoutWaiting via interval', () => {
            waiter.stopAdvancedWaiting();
            const initial = waiter.timeoutWaiting;
            jest.advanceTimersByTime(1000);
            expect(waiter.timeoutWaiting).toBeGreaterThan(initial);
        });

        it('should resume after startAdvancedWaiting', () => {
            waiter.stopAdvancedWaiting();
            waiter.startAdvancedWaiting();
            const cb = jest.fn();
            waiter.advancedWaiting(cb, 500);
            jest.advanceTimersByTime(500);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should clear interval on startAdvancedWaiting', () => {
            waiter.stopAdvancedWaiting();
            waiter.startAdvancedWaiting();
            const current = waiter.timeoutWaiting;
            jest.advanceTimersByTime(5000);
            // Interval cleared, so timeoutWaiting should not keep increasing
            expect(waiter.timeoutWaiting).toBe(current);
        });
    });
});
