import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
type XhrType = [string, XMLHttpRequestResponseType, string];
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
    constructor(opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    private _setTypes;
    private _setType;
    private _getType;
    private _getContentType;
    private _getResponseType;
    private _getAccept;
    private _onReadyStateChange;
    get(url: string, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    post(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    put(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    patch(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    delete(url: string, opt_data: Object | undefined, opt_params: Object | undefined, opt_headers?: Object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<Object>, string], [XMLHttpRequest, Objekt<Object>, string]>;
    private _getUrl;
    private _createRequest;
    private _createRequestBody;
    private _parseObject;
    private _stringifyObject;
    private _getFilenameFromHeader;
    private _handleResponseData;
    private _setRequestHeaders;
    private _setResponseType;
    private _setHeader;
    private _getHeader;
    setBasicAuthorization(username: string, password: string): void;
    setBearerAuthorization(token: string): void;
}
export {};
