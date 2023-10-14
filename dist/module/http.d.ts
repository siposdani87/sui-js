import { Promize } from '../core';
import { Objekt } from '../core/objekt';
import { Xhr } from './xhr';
export declare class Http {
    options: Objekt;
    username: string;
    password: string;
    token: string;
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    setBasicAuthorization(username: string, password: string): void;
    setBearerAuthorization(token: string): void;
    get(url: string, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    post(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    put(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    patch(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    delete(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    private _createXhrRequest;
    private _getPromise;
    eventBeforeRequest(xhr: Xhr): void;
    eventAfterRequest(http: XMLHttpRequest, response: Objekt, filename: string): void;
}
