import { Promize } from '../core';
import { Objekt } from '../core/objekt';
import { Xhr } from './xhr';
export declare class Http {
    options: Objekt;
    username: string;
    password: string;
    token: string;
    constructor(opt_options?: object | undefined);
    private _setOptions;
    private _init;
    setBasicAuthorization(username: string, password: string): void;
    setBearerAuthorization(token: string): void;
    get(url: string, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    post(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    put(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    patch(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    delete(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    private _createXhrRequest;
    private _getPromise;
    eventBeforeRequest(xhr: Xhr): void;
    eventAfterRequest(http: XMLHttpRequest, response: Objekt, filename: string): void;
}
