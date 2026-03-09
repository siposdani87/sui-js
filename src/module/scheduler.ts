import { eachArray, isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';

/**
 * Simple daily task scheduler that registers callbacks to run at
 * specific times of day. Callbacks are stored in an {@link Objekt}
 * keyed by time string, allowing multiple callbacks to be registered
 * for the same time slot.
 *
 * The internal runner checks every 30 seconds whether the current
 * `HH:MM` matches any registered time slot. Each slot fires at most
 * once per minute to prevent duplicate executions.
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
    private _lastFiredTime: string;
    private _intervalId: ReturnType<typeof setInterval> | null;

    /**
     * Creates a new Scheduler instance with an empty callback store
     * and initializes the internal runner.
     */
    constructor() {
        this.schedulerStore = new Objekt();
        this._lastFiredTime = '';
        this._intervalId = null;

        this._callRunner();
    }

    /**
     * Starts the scheduler's internal execution loop. Checks every
     * 30 seconds whether the current time matches a registered slot.
     * Each time slot fires at most once per calendar minute.
     */
    private _callRunner(): void {
        this._intervalId = setInterval(() => {
            const now = new Date();
            const currentTime = this._formatTime(now);

            if (currentTime === this._lastFiredTime) {
                return;
            }
            this._lastFiredTime = currentTime;

            const callbacks =
                this.schedulerStore.get<(() => void)[]>(currentTime);
            if (callbacks && callbacks.length > 0) {
                eachArray(callbacks, (callback) => {
                    callback();
                });
            }
        }, 30000);
    }

    /**
     * Formats a Date into an `HH:MM` string with zero-padded hours
     * and minutes.
     *
     * @param date The date to format.
     * @returns The formatted time string (e.g., `'08:00'`, `'17:30'`).
     */
    private _formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return hours + ':' + minutes;
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
    everyDay(time: string, callback: () => void): () => void {
        const name = time;
        if (isFunction(callback)) {
            const schedulers = this.schedulerStore.get<(() => void)[]>(
                name,
                [],
            );
            schedulers.push(callback);
            this.schedulerStore.set(name, schedulers);
        }
        return callback;
    }

    /**
     * Stops the scheduler's internal execution loop and prevents any
     * further callbacks from being fired. Registered callbacks are
     * retained and will resume if a new Scheduler is created.
     */
    stop(): void {
        if (this._intervalId !== null) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }
}
