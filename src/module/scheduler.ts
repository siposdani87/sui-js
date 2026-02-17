import { isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';

/**
 * Simple daily task scheduler that registers callbacks to run at
 * specific times of day. Callbacks are stored in an {@link Objekt}
 * keyed by time string, allowing multiple callbacks to be registered
 * for the same time slot.
 *
 * @example
 * const scheduler = new Scheduler();
 *
 * scheduler.everyDay('08:00', () => {
 *     console.log('Good morning!');
 * });
 *
 * scheduler.everyDay('17:30', () => {
 *     console.log('End of work day');
 * });
 *
 * @see {@link Objekt}
 * @category Module
 */
export class Scheduler {
    schedulerStore: Objekt;

    /**
     * Creates a new Scheduler instance with an empty callback store
     * and initializes the internal runner.
     */
    constructor() {
        this.schedulerStore = new Objekt();

        this._callRunner();
    }

    /**
     * Initializes the scheduler's internal execution loop.
     * Currently a placeholder for future implementation.
     */
    private _callRunner(): void {
        /* setTimeout(() => {
      eachObject(this.schedulerStore, (schedulerCallbacks, timeKey) => {

      });
    }, 1000);*/
    }

    /**
     * Registers a callback to be executed every day at the specified time.
     * Multiple callbacks can be registered for the same time slot; they
     * are accumulated in an array within the scheduler store.
     *
     * @param time The time of day to execute the callback, as a string
     *     (e.g., `'08:00'`, `'17:30'`).
     * @param callback The function to invoke at the specified time.
     * @returns The registered callback function.
     *
     * @example
     * const scheduler = new Scheduler();
     *
     * const cb = scheduler.everyDay('09:00', () => {
     *     console.log('Daily report');
     * });
     */
    everyDay(time: string, callback: Function): Function {
        const name = time;
        if (isFunction(callback)) {
            const schedulers = this.schedulerStore.get<Function[]>(name, []);
            schedulers.push(callback);
            this.schedulerStore.set(name, schedulers);
        }
        return callback;
    }
}
