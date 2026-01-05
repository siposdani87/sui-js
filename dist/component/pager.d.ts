import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
export declare class Pager {
    pager: Knot;
    pagerStatistics: Knot;
    options: Objekt;
    count: number;
    pageNum: number;
    page: number;
    offset: number;
    constructor(dom: Knot, opt_selectors?: string[] | undefined, opt_options?: object | undefined);
    private _setOptions;
    private _init;
    private _drawPager;
    private _drawStatistics;
    private _drawPreviousButton;
    private _drawNextButton;
    private _drawPageNumbers;
    private _getPagers;
    private _next;
    private _previous;
    setCount(count: number): void;
    private _go;
    setPage(page: number): void;
    draw(): void;
    eventAction(page: number): void;
}
