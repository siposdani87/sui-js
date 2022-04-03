import { isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';

/**
 * @class
 */
export class Scheduler {
    schedulerStore: Objekt;
    /**
     */
    constructor() {
        this.schedulerStore = new Objekt();

        this._callRunner();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _callRunner(): void {
        /* setTimeout(() => {
      eachObject(this.schedulerStore, (schedulerCallbacks, timeKey) => {
  
      });
    }, 1000);*/
    }
    /**
     * @param {string} time
     * @param {!Function} callback
     * @return {!Function}
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
