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
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
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
    get(url: string, opt_params?: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: string, opt_data?: Object | undefined, opt_params?: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers: Object | undefined): Promize;
    /**
     * @private
     * @return {!Xhr}
     */
    _getRequestHandler(): Xhr;
    /**
     * @private
     * @param {!Promize} promise
     * @return {!Promize}
     */
    _getPromise(promise: Promize): Promize;
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
