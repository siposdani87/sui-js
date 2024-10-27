import { Objekt } from '../core';
import { Knot } from '../core/knot';
export declare class Time {
    timeKnot: Knot;
    options: Objekt;
    pointerKnot: Knot;
    constructor(knot: Knot, options: object);
    private _setOptions;
    private _init;
    private _initCircleKnot;
    private _initSize;
    private _initPointerKnot;
    draw(start: number, n: number, opt_j?: number | undefined, opt_isClockWise?: boolean | undefined): void;
    private _drawCircles;
    private _setCircleEvent;
    private _setCircleStyle;
    eventClick(index: number): void;
}
