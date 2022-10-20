import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @class
 */
export declare class Day {
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
     * @return {!Knot}
     */
    getNode(): Knot;
    /**
     * @param {!Date} date
     */
    eventClick(date: Date): void;
}
