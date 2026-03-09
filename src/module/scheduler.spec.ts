import { Scheduler } from './scheduler';

describe('Scheduler', () => {
    let scheduler: Scheduler;

    beforeEach(() => {
        jest.useFakeTimers();
        scheduler = new Scheduler();
    });

    afterEach(() => {
        scheduler.stop();
        jest.useRealTimers();
    });

    it('should be instance of Scheduler', () => {
        expect(scheduler).toBeInstanceOf(Scheduler);
    });

    describe('everyDay', () => {
        it('should register a callback for a time', () => {
            const cb = jest.fn();
            const result = scheduler.everyDay('10:00', cb);
            expect(result).toBe(cb);
        });

        it('should store callback in scheduler store', () => {
            const cb = jest.fn();
            scheduler.everyDay('10:00', cb);
            const stored = scheduler.schedulerStore.get<Function[]>(
                '10:00',
                [],
            );
            expect(stored).toContain(cb);
        });

        it('should register multiple callbacks for same time', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            scheduler.everyDay('08:00', cb1);
            scheduler.everyDay('08:00', cb2);
            const stored = scheduler.schedulerStore.get<Function[]>(
                '08:00',
                [],
            );
            expect(stored).toHaveLength(2);
        });

        it('should register callbacks for different times', () => {
            scheduler.everyDay('08:00', jest.fn());
            scheduler.everyDay('12:00', jest.fn());
            const morning = scheduler.schedulerStore.get<Function[]>(
                '08:00',
                [],
            );
            const noon = scheduler.schedulerStore.get<Function[]>('12:00', []);
            expect(morning).toHaveLength(1);
            expect(noon).toHaveLength(1);
        });

        it('should not register non-function', () => {
            scheduler.everyDay('10:00', null as any);
            const stored = scheduler.schedulerStore.get<Function[]>(
                '10:00',
                [],
            );
            expect(stored).toHaveLength(0);
        });
    });

    describe('_callRunner', () => {
        it('should fire callback when current time matches', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 9, 59, 50));
            scheduler.everyDay('10:00', cb);

            jest.setSystemTime(new Date(2024, 0, 1, 10, 0, 0));
            jest.advanceTimersByTime(30000);

            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should fire multiple callbacks for same time slot', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 8, 0, 0));
            scheduler.everyDay('08:00', cb1);
            scheduler.everyDay('08:00', cb2);

            jest.advanceTimersByTime(30000);

            expect(cb1).toHaveBeenCalledTimes(1);
            expect(cb2).toHaveBeenCalledTimes(1);
        });

        it('should not fire callback when time does not match', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 9, 0, 0));
            scheduler.everyDay('10:00', cb);

            jest.advanceTimersByTime(30000);

            expect(cb).not.toHaveBeenCalled();
        });

        it('should not fire same time slot twice in the same minute', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 10, 0, 0));
            scheduler.everyDay('10:00', cb);

            jest.advanceTimersByTime(30000);
            expect(cb).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(30000);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should fire again on the next day at the same time', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 10, 0, 0));
            scheduler.everyDay('10:00', cb);

            jest.advanceTimersByTime(30000);
            expect(cb).toHaveBeenCalledTimes(1);

            jest.setSystemTime(new Date(2024, 0, 1, 10, 1, 0));
            jest.advanceTimersByTime(30000);

            jest.setSystemTime(new Date(2024, 0, 2, 10, 0, 0));
            jest.advanceTimersByTime(30000);
            expect(cb).toHaveBeenCalledTimes(2);
        });

        it('should pad single-digit hours and minutes', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 8, 5, 0));
            scheduler.everyDay('08:05', cb);

            jest.advanceTimersByTime(30000);

            expect(cb).toHaveBeenCalledTimes(1);
        });
    });

    describe('stop', () => {
        it('should stop the runner from firing callbacks', () => {
            const cb = jest.fn();
            jest.setSystemTime(new Date(2024, 0, 1, 10, 0, 0));
            scheduler.everyDay('10:00', cb);

            scheduler.stop();
            jest.advanceTimersByTime(30000);

            expect(cb).not.toHaveBeenCalled();
        });

        it('should be safe to call stop multiple times', () => {
            expect(() => {
                scheduler.stop();
                scheduler.stop();
            }).not.toThrow();
        });
    });
});
