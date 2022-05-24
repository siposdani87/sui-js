import { Objekt } from '../core';
import { Item } from '../core/item';
/**
 * @class
 */
export declare class Month {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    /**
     * @param {!Date} date
     * @param {!Date} currentDate
     * @param {!Object} options
     */
    constructor(date: Date, currentDate: Date, options: Object);
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
     * @param {!Date} date
     */
    eventClick(date: Date): void;
}
