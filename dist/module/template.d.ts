import { Objekt } from '../core/objekt';
import { Http } from './http';
import { Knot } from '../core';
export declare class Template {
    http: Http;
    options: Objekt<{
        selector: string;
        locale: string;
    }>;
    viewKnot: Knot;
    constructor(http: Http, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    getViewKnot(): Knot;
    load(url: string, opt_force?: boolean | undefined): import("../core").Promize<Knot<HTMLElement>, Knot<HTMLElement>>;
    _spaNavigate(data: Knot, isError: boolean): Knot<HTMLElement>;
    private _updateDOM;
    eventError(message: {
        type: string;
        content: string;
    }): void;
}
