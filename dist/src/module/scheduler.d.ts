import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Scheduler {
    schedulerStore: Objekt;
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    private _callRunner;
    /**
     * @param {string} time
     * @param {!Function} callback
     * @return {!Function}
     */
    everyDay(time: string, callback: Function): Function;
}
