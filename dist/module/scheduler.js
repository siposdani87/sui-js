import { isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';
export class Scheduler {
    constructor() {
        this.schedulerStore = new Objekt();
        this._callRunner();
    }
    _callRunner() {
        /* setTimeout(() => {
      eachObject(this.schedulerStore, (schedulerCallbacks, timeKey) => {
  
      });
    }, 1000);*/
    }
    everyDay(time, callback) {
        const name = time;
        if (isFunction(callback)) {
            const schedulers = this.schedulerStore.get(name, []);
            schedulers.push(callback);
            this.schedulerStore.set(name, schedulers);
        }
        return callback;
    }
}
