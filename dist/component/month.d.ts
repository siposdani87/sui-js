import { Objekt } from '../core';
import { Knot } from '../core/knot';
export declare class Month {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    constructor(date: Date, currentDate: Date, options: Object);
    private _setOptions;
    private _init;
    getKnot(): Knot;
    eventClick(date: Date): void;
}
