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
    _callRunner(): void;
    /**
     * @param {string} time
     * @param {!Function} callback
     * @return {!Function}
     */
    everyDay(time: any, callback: any): any;
}
