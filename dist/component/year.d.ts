import { Objekt } from '../core';
import { Knot } from '../core/knot';
export declare class Year {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    constructor(date: Date, currentDate: Date, options: object);
    private _setOptions;
    private _init;
    getKnot(): Knot;
    eventClick(date: Date): void;
}
