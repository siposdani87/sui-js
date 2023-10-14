import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
type XhrType = [string, XMLHttpRequestResponseType, string];
/**
 * @class
 */
export declare class Xhr {
    options: Objekt<{
        backend: string;
        locale: string;
    }>;
    requestHeaders: {};
    authorization: string;
    types: {
        [key: string]: XhrType;
    };
    httpRequest: XMLHttpRequest;
    deferred: Deferred<[
        XMLHttpRequest,
        Objekt,
        string
    ], [
        XMLHttpRequest,
        Objekt,
        string
    ]>;
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
     * @private
     * @return {undefined}
     */
    private _setTypes;
    /**
     * @private
     * @param {string} name
     * @param {!XhrType} value
     * @return {undefined}
     */
    private _setType;
    /**
     * @private
     * @param {string} name
     * @return {!XhrType}
     */
    private _getType;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getContentType;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getResponseType;
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getAccept;
    /**
     * @private
     * @return {function(XMLHttpRequest, Event): undefined}
     */
    private _onReadyStateChange;
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: string, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    /**
     * @private
     * @param {string} url
     * @param {!Object=} opt_params
     * @return {string}
     */
    private _getUrl;
    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    private _createRequest;
    /**
     * @private
     * @param {!Object=} opt_data
     * @return {string}
     */
    private _createRequestBody;
    /**
     * @private
     * @param {*} obj
     * @param {string} key
     * @param {string} stringKey
     * @return {!Array<string>}
     */
    private _parseObject;
    /**
     * @private
     * @param {!Object} obj
     * @return {string}
     */
    private _stringifyObject;
    /**
     * @private
     * @return {string}
     */
    private _getFilenameFromHeader;
    /**
     * @private
     * @param {*} response
     * @return {!Promize}
     */
    private _handleResponseData;
    /**
     * @private
     * @param {string} urlType
     * @param {!Object=} opt_headers
     * @return {undefined}
     */
    private _setRequestHeaders;
    /**
     * @private
     * @param {string} urlType
     * @return {undefined}
     */
    private _setResponseType;
    /**
     * @param {string} name
     * @param {string} value
     * @return {undefined}
     */
    private _setHeader;
    /**
     * @param {string} name
     * @return {string|null}
     */
    private _getHeader;
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
