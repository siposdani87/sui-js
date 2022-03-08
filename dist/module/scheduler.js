import { isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export class Scheduler {
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
    _callRunner() {
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
    everyDay(time, callback) {
        const name = time; // window['moment']
        if (isFunction(callback)) {
            const schedulers = this.schedulerStore.get(name, []);
            schedulers.push(callback);
            this.schedulerStore.set(name, schedulers);
        }
        return callback;
    }
}
