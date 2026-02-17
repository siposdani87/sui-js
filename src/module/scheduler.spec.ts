import { Scheduler } from './scheduler';

describe('Scheduler', () => {
    let scheduler: Scheduler;

    beforeEach(() => {
        scheduler = new Scheduler();
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
});
