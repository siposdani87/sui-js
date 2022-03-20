import { Item } from '../core/item';
/**
 * @class
 */
export declare class Month {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: string[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date: string, currentDate: Object, options: Object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {!Item}
     */
    getNode(): Item;
    /**
     * @param {!Object} date
     */
    eventClick(date: Object): void;
}
