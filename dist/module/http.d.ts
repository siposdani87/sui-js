import { Objekt } from '../core/objekt';
import { Xhr } from './xhr';
/**
 * @class
 */
export declare class Http {
    options: Objekt;
    username: any;
    password: any;
    token: any;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
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
    setBasicAuthorization(username: any, password: any): void;
    /**
     * @param {string} token
     */
    setBearerAuthorization(token: any): void;
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: any, opt_params?: any, opt_headers?: any): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: any, opt_data?: any, opt_params?: any, opt_headers?: any): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: any, opt_data: any, opt_params: any, opt_headers: any): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: any, opt_data: any, opt_params: any, opt_headers: any): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: any, opt_data: any, opt_params: any, opt_headers: any): import("..").Promize;
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
    _getPromise(promise: any): import("..").Promize;
    /**
     * @param {!Xhr} http
     * @return {undefined}
     */
    eventBeforeRequest(http: any): void;
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(http: any, response: any): void;
}
