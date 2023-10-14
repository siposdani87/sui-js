import { Promize } from '../core';
import { Objekt } from '../core/objekt';
import { Xhr } from './xhr';
/**
 * @class
 */
export declare class Http {
    options: Objekt;
    username: string;
    password: string;
    token: string;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username: string, password: string): void;
    /**
     * @param {string} token
     */
    setBearerAuthorization(token: string): void;
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: string, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<[Objekt<Object>, string], [Objekt<Object>, string]>;
    /**
     * @private
     * @return {!Xhr}
     */
    private _createXhrRequest;
    /**
     * @private
     * @param {!Promize} promise
     * @return {!Promize}
     */
    private _getPromise;
    /**
     * @param {!Xhr} xhr
     * @return {undefined}
     */
    eventBeforeRequest(xhr: Xhr): void;
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(http: XMLHttpRequest, response: Objekt, filename: string): void;
}
