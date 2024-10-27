import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
type XhrType = [string, XMLHttpRequestResponseType, string];
export declare class Xhr {
    options: Objekt<{
        backend: string;
        locale: string;
    }>;
    requestHeaders: {
        [key: string]: string;
    };
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
    constructor(opt_options?: object | undefined);
    private _setOptions;
    private _init;
    private _setTypes;
    private _setType;
    private _getType;
    private _getContentType;
    private _getResponseType;
    private _getAccept;
    private _onReadyStateChange;
    get(url: string, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    post(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    put(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    patch(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    delete(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    private _getUrl;
    private _createRequest;
    private _createRequestBody;
    private _parseobject;
    private _stringifyobject;
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
