import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Xhr {
    options: Objekt;
    requestHeaders: {};
    authorization: any;
    types: {};
    http: XMLHttpRequest;
    deferred: Deferred;
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
     * @private
     * @return {undefined}
     */
    _setTypes(): void;
    /**
     * @private
     * @param {string} name
     * @param {!Array} value
     * @return {undefined}
     */
    _setType(name: any, value: any): void;
    /**
     * @private
     * @param {string} name
     * @return {!Array}
     */
    _getType(name: any): any;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getContentType(name: any): any;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getResponseType(name: any): any;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getAccept(name: any): any;
    /**
     * @private
     * @return {!Function}
     */
    _onReadyStateChange(): () => void;
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: any, opt_data: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: any, opt_data: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: any, opt_data: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: any, opt_data: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @private
     * @param {string} url
     * @param {!Object=} opt_params
     * @return {string}
     */
    _getUrl(url: any, opt_params: any): string;
    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    _handleRequest(type: any, url: any, opt_data: any, opt_params: any, opt_headers?: {}): import("..").Promize;
    /**
     * @private
     * @param {!Object=} opt_data
     * @return {string}
     */
    _getRequestData(opt_data: any): string;
    /**
     * @private
     * @param {*} obj
     * @param {string} key
     * @param {string} stringKey
     * @return {!Array}
     */
    _parseObject(obj: any, key: any, stringKey: any): any[];
    /**
     * @private
     * @param {!Object} obj
     * @return {string}
     */
    _stringifyObject(obj: any): string;
    /**
     * @private
     * @return {string}
     */
    _getFilenameFromHeader(): string;
    /**
     * @private
     * @param {*} data
     * @return {!Promize}
     */
    _getResponseData(data: any): import("..").Promize;
    /**
     * @private
     * @param {string} urlType
     * @param {!Object=} opt_headers
     * @return {undefined}
     */
    _setRequestHeaders(urlType: any, opt_headers?: {}): void;
    /**
     * @private
     * @param {string} urlType
     * @return {undefined}
     */
    _setResponseType(urlType: any): void;
    /**
     * @param {string} name
     * @param {string} value
     * @return {undefined}
     */
    setHeader(name: any, value: any): void;
    /**
     * @param {string} name
     * @return {string|null}
     */
    getHeader(name: any): any;
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username: any, password: any): void;
    /**
     * @param {string} token
     * @return {undefined}
     */
    setBearerAuthorization(token: any): void;
}
