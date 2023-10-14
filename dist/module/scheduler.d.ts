import { Objekt } from '../core/objekt';
export declare class Scheduler {
    schedulerStore: Objekt;
    constructor();
    private _callRunner;
    everyDay(time: string, callback: Function): Function;
}
