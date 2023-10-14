import { isFunction } from '../utils/operation';
import { Objekt } from '../core/objekt';

export class Scheduler {
    schedulerStore: Objekt;

    constructor() {
        this.schedulerStore = new Objekt();

        this._callRunner();
    }

    private _callRunner(): void {
        /* setTimeout(() => {
      eachObject(this.schedulerStore, (schedulerCallbacks, timeKey) => {
  
      });
    }, 1000);*/
    }

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
