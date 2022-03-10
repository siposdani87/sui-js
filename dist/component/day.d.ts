import { Item } from '../core/item';
/**
 * @class
 */
export declare class Day {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: any[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date: any, currentDate: any, options: any);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {!Item}
     */
    getNode(): Item<HTMLElement>;
    /**
     * @param {!Object} date
     */
    eventClick(date: any): void;
}
