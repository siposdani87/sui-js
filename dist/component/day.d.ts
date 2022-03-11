import { Item } from '../core/item';
/**
 * @class
 */
export declare class Day {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: string[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date: string, currentDate: object, options: object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: object): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {!Item}
     */
    getNode(): Item;
    /**
     * @param {!Object} date
     */
    eventClick(date: object): void;
}
