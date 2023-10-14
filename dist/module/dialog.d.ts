import { Objekt } from '../core/objekt';
import { BaseModal } from './baseModal';
import { Http } from './http';
import { Knot } from '../core';
export declare class Dialog extends BaseModal {
    http: Http;
    options: Objekt;
    constructor(http: Http, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    loadTemplate(url: string): import("../core").Promize<Knot<HTMLElement>, Knot<HTMLElement>>;
    private _handleMessage;
    private _handleDom;
    private _handleActions;
}
