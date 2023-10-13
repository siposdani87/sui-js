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
    get<T, K>(url: string, opt_params?: Object, opt_headers?: Object): Promize<T, K>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post<T, K>(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<T, K>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put<T, K>(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<T, K>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch<T, K>(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<T, K>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete<T, K>(url: string, opt_data?: Object, opt_params?: Object, opt_headers?: Object): Promize<T, K>;
    /**
     * @private
     * @return {!Xhr}
     */
    private _getRequestHandler;
    /**
     * @private
     * @param {!Promize} promise
     * @return {!Promize}
     */
    private _getPromise;
    /**
     * @param {!Xhr} http
     * @return {undefined}
     */
    eventBeforeRequest(http: Xhr): void;
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(http: XMLHttpRequest, response: any): void;
}
