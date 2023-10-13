import {
    eq,
    getExtensionName,
    instanceOf,
    isString,
    eachObject,
    isUndefined,
    urlWithQueryString,
} from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';
import { encodeBase64 } from '../utils/coder';
import { Promize } from '../core';

export type XhrType = [string, XMLHttpRequestResponseType, string];

/**
 * @class
 */
export class Xhr {
    options: Objekt<{ backend: string; locale: string }>;
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
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.requestHeaders = {};
        this.authorization = null;
        this.types = {};

        this._setTypes();

        this.http = new XMLHttpRequest();
        this.http.onreadystatechange = this._onReadyStateChange() as any as (
            this: XMLHttpRequest,
            ev: Event,
        ) => any;

        this.deferred = new Deferred();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _setTypes(): void {
        this._setType('json', ['application/json', 'json', 'application/json']);
        this._setType('form', [
            'application/x-www-form-urlencoded',
            'json',
            'application/json',
        ]);

        this._setType('html', ['', 'document', 'text/html']);
        this._setType('svg', ['', 'document', 'image/svg-xml']);
        this._setType('xml', ['', 'document', 'application/xml']);
    }
    /**
     * @private
     * @param {string} name
     * @param {!XhrType} value
     * @return {undefined}
     */
    private _setType(name: string, value: XhrType): void {
        this.types[name] = value;
    }
    /**
     * @private
     * @param {string} name
     * @return {!XhrType}
     */
    private _getType(name: string): XhrType {
        return this.types[name] || ['', 'text', '*/*'];
    }
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getContentType(name: string): string {
        return this._getType(name)[0];
    }
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getResponseType(name: string): XMLHttpRequestResponseType {
        return this._getType(name)[1];
    }
    /**
     * @private
     * @param {string} name
     * @return {string}
     */
    private _getAccept(name: string): string {
        return this._getType(name)[2];
    }
    /**
     * @private
     * @return {function(XMLHttpRequest, Event): undefined}
     */
    private _onReadyStateChange(): (_this: XMLHttpRequest, _ev: Event) => any {
        return (_this: XMLHttpRequest, _ev: Event): any => {
            switch (this.http.readyState) {
                case 0:
                    // request not initialized
                    break;
                case 1:
                    // server connection established
                    break;
                case 2:
                    // request received
                    break;
                case 3:
                    // processing request
                    break;
                case 4:
                    // Request finished and response is ready
                    this._getResponseData(this.http.response).then(
                        (response) => {
                            if (eq(this.http.status, 200)) {
                                this.deferred.resolve(
                                    [this.http].concat(response),
                                );
                            } else {
                                this.deferred.reject(
                                    [this.http].concat(response),
                                );
                            }
                        },
                    );
                    break;
                default:
                    consoleWarn(
                        'Xhr._onReadyStateChange()',
                        this.http.readyState,
                    );
                    break;
            }
        };
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(
        url: string,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        return this._handleRequest('GET', url, {}, opt_params, opt_headers);
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(
        url: string,
        opt_data: Object | undefined,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        return this._handleRequest(
            'POST',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(
        url: string,
        opt_data: Object | undefined,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        return this._handleRequest(
            'PUT',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(
        url: string,
        opt_data: Object | undefined,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        return this._handleRequest(
            'PATCH',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(
        url: string,
        opt_data: Object | undefined,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        return this._handleRequest(
            'DELETE',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }
    /**
     * @private
     * @param {string} url
     * @param {!Object=} opt_params
     * @return {string}
     */
    private _getUrl(url: string, opt_params: Object | undefined): string {
        const uri = urlWithQueryString(url, opt_params);
        return url[0] === '/' ? this.options.backend + uri : uri;
    }
    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    private _handleRequest(
        type: string,
        url: string,
        opt_data: Object | undefined,
        opt_params: Object | undefined,
        opt_headers: Object | undefined = {},
    ): Promize {
        this.http.open(type, this._getUrl(url, opt_params), true);
        const urlType = getExtensionName(url);
        this._setResponseType(urlType);
        this._setRequestHeaders(urlType, opt_headers);
        this.http.send(this._getRequestData(opt_data));
        return this.deferred.promise();
    }
    /**
     * @private
     * @param {!Object=} opt_data
     * @return {string}
     */
    private _getRequestData(opt_data: Object | undefined): string {
        let result = '';
        if (opt_data) {
            switch (this.getHeader('Content-Type')) {
                case this._getContentType('json'):
                    result = JSON.stringify(opt_data);
                    break;
                case this._getContentType('form'):
                    result = this._stringifyObject(opt_data);
                    break;
            }
        }
        return result;
    }
    /**
     * @private
     * @param {*} obj
     * @param {string} key
     * @param {string} stringKey
     * @return {!Array<string>}
     */
    private _parseObject(
        obj: any,
        key: string,
        stringKey: string,
    ): Array<string> {
        stringKey += stringKey ? '[' + key + ']' : key;
        let results = [];
        if (obj instanceof Array) {
            stringKey += '[]';
            for (let i = 0; i < obj.length; i++) {
                results.push([stringKey, obj[i]].join('='));
            }
        } else if (typeof obj === 'object') {
            for (const j in obj) {
                if (obj.hasOwnProperty(j)) {
                    const pairs = this._parseObject(obj[j], j, stringKey);
                    results = results.concat(pairs);
                }
            }
        } else {
            results.push([stringKey, obj].join('='));
        }
        return results;
    }
    /**
     * @private
     * @param {!Object} obj
     * @return {string}
     */
    private _stringifyObject(obj: Object): string {
        let results = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const pair = this._parseObject(obj[key], key, '');
                results = results.concat(pair);
            }
        }
        return results.join('&');
    }
    /**
     * @private
     * @return {string}
     */
    private _getFilenameFromHeader(): string {
        let filename = '';

        try {
            if (!this.http.responseURL.startsWith(this.options.backend)) {
                return;
            }
            const contentDisposition = this.http.getResponseHeader(
                'Content-Disposition',
            );
            if (contentDisposition) {
                filename = contentDisposition.match(/filename="(.+)"/)[1];
            }
        } catch (_e) {
            // consoleWarn(e);
        }
        return filename;
    }
    /**
     * @private
     * @param {*} data
     * @return {!Promize}
     */
    private _getResponseData(data: any): Promize {
        const deferred = new Deferred();
        const filename = this._getFilenameFromHeader();

        const contentType = this.http.getResponseHeader('Content-Type');
        if (contentType) {
            switch (contentType.split(';')[0]) {
                case 'application/json':
                    if (instanceOf(data, Blob)) {
                        const reader = new FileReader();
                        reader.addEventListener('loadend', (e) => {
                            data = JSON.parse(
                                (e.target.result as string) || 'null',
                            );
                            const object = new Objekt();
                            object.merge(data);
                            deferred.resolve([[object, filename]]);
                        });
                        reader.readAsText(data);
                    } else {
                        data = isString(data)
                            ? JSON.parse(data || 'null')
                            : data;
                        const object = new Objekt();
                        object.merge(data);
                        deferred.resolve([[object, filename]]);
                    }
                    break;
                default:
                    // let parserHtml = new DOMParser();
                    // result = parserHtml.parseFromString(data, 'text/html');
                    // result = new Blob([data], {'type': contentType});
                    // result = data;
                    deferred.resolve([[data, filename]]);
                    break;
            }
        }
        return deferred.promise();
    }
    /**
     * @private
     * @param {string} urlType
     * @param {!Object=} opt_headers
     * @return {undefined}
     */
    private _setRequestHeaders(
        urlType: string,
        opt_headers: Object | undefined = {},
    ): void {
        eachObject(opt_headers, (value, key) => {
            if (eq(key, 'responseType')) {
                this.http.responseType = value;
            } else {
                this.setHeader(key, value);
            }
        });

        if (isUndefined(this.getHeader('Accept'))) {
            this.setHeader('Accept', this._getAccept(urlType));
        }
        if (isUndefined(this.getHeader('Accept-Language'))) {
            this.setHeader('Accept-Language', this.options.locale);
        }
        if (isUndefined(this.getHeader('Content-Type'))) {
            this.setHeader('Content-Type', this._getContentType(urlType));
        }
        if (
            isUndefined(this.getHeader('Authorization')) &&
            this.authorization
        ) {
            this.setHeader('Authorization', this.authorization);
            this.http.withCredentials = true;
        }
        if (isUndefined(this.getHeader('X-Requested-With'))) {
            this.setHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }
    /**
     * @private
     * @param {string} urlType
     * @return {undefined}
     */
    private _setResponseType(urlType: string): void {
        this.http.responseType = this._getResponseType(urlType);
    }
    /**
     * @param {string} name
     * @param {string} value
     * @return {undefined}
     */
    setHeader(name: string, value: string): void {
        if (name && value) {
            this.http.setRequestHeader(name, value);
        }
        this.requestHeaders[name] = value;
    }
    /**
     * @param {string} name
     * @return {string|null}
     */
    getHeader(name: string): string | null {
        return this.requestHeaders[name];
    }
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username: string, password: string): void {
        if (username && password) {
            const hash = [username, password].join(':');
            this.authorization = 'Basic ' + encodeBase64(hash);
        }
    }
    /**
     * @param {string} token
     * @return {undefined}
     */
    setBearerAuthorization(token: string): void {
        if (token) {
            this.authorization = 'Bearer ' + token;
        }
    }
}
