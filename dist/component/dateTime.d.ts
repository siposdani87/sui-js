import { Objekt } from '../core';
import { Knot } from '../core/knot';
type DateTimeConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};
export declare class DateTime {
    datetimeKnot: Knot;
    options: Objekt;
    types: {
        [key: string]: DateTimeConfig;
    };
    config: DateTimeConfig;
    calendarKnot: Knot;
    clockKnot: Knot;
    value: Date;
    constructor(knot: Knot, options: Object);
    private _setOptions;
    private _init;
    private _initVariables;
    private _initStructure;
    private _initDateTimeKnot;
    private _initCalendarKnot;
    private _initClockKnot;
    getConfig(): DateTimeConfig;
    private _setValue;
    setValue(value: string): void;
    getFormattedValue(): string;
    draw(): void;
    private _drawCalendar;
    private _drawClock;
    private _onClick;
    eventClick(value: string): void;
}
export {};
