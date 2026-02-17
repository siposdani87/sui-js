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
import { consoleError, consoleWarn } from '../utils/log';
import { encodeBase64 } from '../utils/coder';

type XhrType = [string, XMLHttpRequestResponseType, string];

export class Xhr {
    options!: Objekt<{ backend: string; locale: string }>;
    requestHeaders!: {
        [key: string]: string;
    };
    authorization!: string | null;
    types!: {
        [key: string]: XhrType;
    };
    httpRequest!: XMLHttpRequest;
    deferred!: Deferred<
        [XMLHttpRequest, Objekt, string],
        [XMLHttpRequest, Objekt, string]
    >;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.requestHeaders = {};
        this.authorization = null;
        this.types = {};

        this._setTypes();

        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange =
            this._onReadyStateChange() as any as (
                this: XMLHttpRequest,
                ev: Event,
            ) => any;

        this.deferred = new Deferred();
    }

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

    private _setType(name: string, value: XhrType): void {
        this.types[name] = value;
    }

    private _getType(name: string): XhrType {
        return this.types[name] || ['', 'text', '*/*'];
    }

    private _getContentType(name: string): string {
        return this._getType(name)[0];
    }

    private _getResponseType(name: string): XMLHttpRequestResponseType {
        return this._getType(name)[1];
    }

    private _getAccept(name: string): string {
        return this._getType(name)[2];
    }

    private _onReadyStateChange(): (_this: XMLHttpRequest, ev: Event) => any {
        return (_this: XMLHttpRequest, ev: Event): any => {
            switch (this.httpRequest.readyState) {
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
                    this._handleResponseData(this.httpRequest.response).then(
                        (response) => {
                            if (eq(this.httpRequest.status, 200)) {
                                this.deferred.resolve([
                                    this.httpRequest,
                                    ...response,
                                ]);
                            } else {
                                this.deferred.reject([
                                    this.httpRequest,
                                    ...response,
                                ]);
                            }
                        },
                    );
                    break;
                default:
                    consoleWarn(
                        'Xhr._onReadyStateChange()',
                        this.httpRequest.readyState,
                    );
                    break;
            }
        };
    }

    get(
        url: string,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest('GET', url, {}, opt_params, opt_headers);
    }

    post(
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest(
            'POST',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    put(
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest(
            'PUT',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    patch(
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest(
            'PATCH',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    delete(
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest(
            'DELETE',
            url,
            opt_data,
            opt_params,
            opt_headers,
        );
    }

    private _getUrl(url: string, opt_params: object | undefined): string {
        const uri = urlWithQueryString(url, opt_params);
        return url[0] === '/' ? this.options.backend + uri : uri;
    }

    private _createRequest(
        type: string,
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        this.httpRequest.open(type, this._getUrl(url, opt_params), true);

        const urlType = getExtensionName(url);
        this._setResponseType(urlType);
        this._setRequestHeaders(urlType, opt_headers);

        this.httpRequest.send(this._createRequestBody(opt_data));

        return this.deferred.promise();
    }

    private _createRequestBody(opt_data?: object): string {
        let result = '';
        if (opt_data) {
            switch (this._getHeader('Content-Type')) {
                case this._getContentType('json'):
                    result = JSON.stringify(opt_data);
                    break;
                case this._getContentType('form'):
                    result = this._stringifyobject(opt_data);
                    break;
            }
        }
        return result;
    }

    private _parseobject(
        obj: any,
        key: string,
        stringKey: string,
    ): Array<string> {
        stringKey += stringKey ? '[' + key + ']' : key;
        let results: string[] = [];
        if (obj instanceof Array) {
            stringKey += '[]';
            for (let i = 0; i < obj.length; i++) {
                results.push([stringKey, obj[i]].join('='));
            }
        } else if (typeof obj === 'object') {
            for (const j in obj) {
                if (obj.hasOwnProperty(j)) {
                    const pairs = this._parseobject(obj[j], j, stringKey);
                    results = results.concat(pairs);
                }
            }
        } else {
            results.push([stringKey, obj].join('='));
        }
        return results;
    }

    private _stringifyobject(obj: object): string {
        let results: string[] = [];
        for (const key in obj) {
            if ((obj as Record<string, any>).hasOwnProperty(key)) {
                const pair = this._parseobject((obj as Record<string, any>)[key], key, '');
                results = results.concat(pair);
            }
        }
        return results.join('&');
    }

    private _getFilenameFromHeader(): string {
        let filename = '';

        try {
            if (
                !this.httpRequest.responseURL.startsWith(this.options.backend)
            ) {
                return '';
            }
            const contentDisposition = this.httpRequest.getResponseHeader(
                'Content-Disposition',
            );
            if (contentDisposition) {
                filename = contentDisposition.match(/filename="(.+)"/)![1];
            }
        } catch (error) {
            consoleError('Xhr._getFilenameFromHeader', error);
        }
        return filename;
    }

    private _handleResponseData(response: any) {
        const deferred = new Deferred<[[Objekt, string]], undefined>();
        const filename = this._getFilenameFromHeader();

        const contentType = this.httpRequest.getResponseHeader('Content-Type');
        if (contentType) {
            switch (contentType.split(';')[0]) {
                case 'application/json':
                    if (instanceOf(response, Blob)) {
                        const reader = new FileReader();
                        reader.addEventListener('loadend', (e) => {
                            const data = JSON.parse(
                                (e.target!.result as string) || 'null',
                            );
                            const objekt = new Objekt();
                            objekt.setRaw('raw', data);
                            deferred.resolve([[objekt, filename]]);
                        });
                        reader.readAsText(response);
                    } else {
                        const data = isString(response)
                            ? JSON.parse(response || 'null')
                            : response;
                        const objekt = new Objekt();
                        objekt.merge(data);
                        deferred.resolve([[objekt, filename]]);
                    }
                    break;
                default:
                    const objekt = new Objekt();
                    objekt.setRaw('raw', response);
                    deferred.resolve([[objekt, filename]]);
                    break;
            }
        }
        return deferred.promise();
    }

    private _setRequestHeaders(
        urlType: string,
        opt_headers: object | undefined = {},
    ): void {
        eachObject(opt_headers, (value, key) => {
            if (eq(key, 'responseType')) {
                this.httpRequest.responseType = value;
            } else {
                this._setHeader(key, value);
            }
        });

        if (isUndefined(this._getHeader('Accept'))) {
            this._setHeader('Accept', this._getAccept(urlType));
        }
        if (isUndefined(this._getHeader('Accept-Language'))) {
            this._setHeader('Accept-Language', this.options.locale);
        }
        if (isUndefined(this._getHeader('Content-Type'))) {
            this._setHeader('Content-Type', this._getContentType(urlType));
        }
        if (
            isUndefined(this._getHeader('Authorization')) &&
            this.authorization
        ) {
            this._setHeader('Authorization', this.authorization);
            this.httpRequest.withCredentials = true;
        }
        if (isUndefined(this._getHeader('X-Requested-With'))) {
            this._setHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }

    private _setResponseType(urlType: string): void {
        this.httpRequest.responseType = this._getResponseType(urlType);
    }

    private _setHeader(name: string, value: string): void {
        if (name && value) {
            this.httpRequest.setRequestHeader(name, value);
        }
        this.requestHeaders[name] = value;
    }

    private _getHeader(name: string): string | null {
        return this.requestHeaders[name];
    }

    setBasicAuthorization(username: string | null, password: string | null): void {
        if (username && password) {
            const hash = [username, password].join(':');
            this.authorization = 'Basic ' + encodeBase64(hash);
        }
    }

    setBearerAuthorization(token: string | null): void {
        if (token) {
            this.authorization = 'Bearer ' + token;
        }
    }
}
