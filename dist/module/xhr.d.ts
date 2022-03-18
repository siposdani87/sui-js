import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Promize } from '../core';
declare type XhrType = [string, XMLHttpRequestResponseType, string];
/**
 * @class
 */
export declare class Xhr {
    options: Objekt;
    requestHeaders: {};
    authorization: string;
    types: {
        [key: string]: XhrType;
    };
    http: XMLHttpRequest;
    deferred: Deferred;
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
     * @private
     * @return {undefined}
     */
    _setTypes(): void;
    /**
     * @private
     * @param {string} name
     * @param {!XhrType} value
     * @return {undefined}
     */
    _setType(name: string, value: XhrType): void;
    /**
     * @private
     * @param {string} name
     * @return {!XhrType}
     */
    _getType(name: string): XhrType;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getContentType(name: string): string;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getResponseType(name: string): XMLHttpRequestResponseType;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    _getAccept(name: string): string;
    /**
     * @private
     * @return {function(XMLHttpRequest, Event): undefined}
     */
    _onReadyStateChange(): (_this: XMLHttpRequest, _ev: Event) => any;
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: string, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @private
     * @param {string} url
     * @param {!Object=} opt_params
     * @return {string}
     */
    _getUrl(url: string, opt_params: Object | undefined): string;
    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    _handleRequest(type: string, url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): Promize;
    /**
     * @private
     * @param {!Object=} opt_data
     * @return {string}
     */
    _getRequestData(opt_data: Object | undefined): string;
    /**
     * @private
     * @param {*} obj
     * @param {string} key
     * @param {string} stringKey
     * @return {!Array<string>}
     */
    _parseObject(obj: any, key: string, stringKey: string): Array<string>;
    /**
     * @private
     * @param {!Object} obj
     * @return {string}
     */
    _stringifyObject(obj: Object): string;
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
    _getResponseData(data: any): Promize;
    /**
     * @private
     * @param {string} urlType
     * @param {!Object=} opt_headers
     * @return {undefined}
     */
    _setRequestHeaders(urlType: string, opt_headers?: Object | undefined): void;
    /**
     * @private
     * @param {string} urlType
     * @return {undefined}
     */
    _setResponseType(urlType: string): void;
    /**
     * @param {string} name
     * @param {string} value
     * @return {undefined}
     */
    setHeader(name: string, value: string): void;
    /**
     * @param {string} name
     * @return {string|null}
     */
    getHeader(name: string): string | null;
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username: string, password: string): void;
    /**
     * @param {string} token
     * @return {undefined}
     */
    setBearerAuthorization(token: string): void;
}
export {};
