import { eq, getExtensionName, instanceOf, isString, eachObject, isUndefined, urlWithQueryString, } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleError, consoleWarn } from '../utils/log';
import { encodeBase64 } from '../utils/coder';
export class Xhr {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.requestHeaders = {};
        this.authorization = null;
        this.types = {};
        this._setTypes();
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onreadystatechange =
            this._onReadyStateChange();
        this.deferred = new Deferred();
    }
    _setTypes() {
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
    _setType(name, value) {
        this.types[name] = value;
    }
    _getType(name) {
        return this.types[name] || ['', 'text', '*/*'];
    }
    _getContentType(name) {
        return this._getType(name)[0];
    }
    _getResponseType(name) {
        return this._getType(name)[1];
    }
    _getAccept(name) {
        return this._getType(name)[2];
    }
    _onReadyStateChange() {
        return (_this, ev) => {
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
                    this._handleResponseData(this.httpRequest.response).then((response) => {
                        if (eq(this.httpRequest.status, 200)) {
                            this.deferred.resolve([
                                this.httpRequest,
                                ...response,
                            ]);
                        }
                        else {
                            this.deferred.reject([
                                this.httpRequest,
                                ...response,
                            ]);
                        }
                    });
                    break;
                default:
                    consoleWarn('Xhr._onReadyStateChange()', this.httpRequest.readyState);
                    break;
            }
        };
    }
    get(url, opt_params, opt_headers = {}) {
        return this._createRequest('GET', url, {}, opt_params, opt_headers);
    }
    post(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('POST', url, opt_data, opt_params, opt_headers);
    }
    put(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('PUT', url, opt_data, opt_params, opt_headers);
    }
    patch(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('PATCH', url, opt_data, opt_params, opt_headers);
    }
    delete(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('DELETE', url, opt_data, opt_params, opt_headers);
    }
    _getUrl(url, opt_params) {
        const uri = urlWithQueryString(url, opt_params);
        return url[0] === '/' ? this.options.backend + uri : uri;
    }
    _createRequest(type, url, opt_data, opt_params, opt_headers = {}) {
        this.httpRequest.open(type, this._getUrl(url, opt_params), true);
        const urlType = getExtensionName(url);
        this._setResponseType(urlType);
        this._setRequestHeaders(urlType, opt_headers);
        this.httpRequest.send(this._createRequestBody(opt_data));
        return this.deferred.promise();
    }
    _createRequestBody(opt_data) {
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
    _parseobject(obj, key, stringKey) {
        stringKey += stringKey ? '[' + key + ']' : key;
        let results = [];
        if (obj instanceof Array) {
            stringKey += '[]';
            for (let i = 0; i < obj.length; i++) {
                results.push([stringKey, obj[i]].join('='));
            }
        }
        else if (typeof obj === 'object') {
            for (const j in obj) {
                if (obj.hasOwnProperty(j)) {
                    const pairs = this._parseobject(obj[j], j, stringKey);
                    results = results.concat(pairs);
                }
            }
        }
        else {
            results.push([stringKey, obj].join('='));
        }
        return results;
    }
    _stringifyobject(obj) {
        let results = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const pair = this._parseobject(obj[key], key, '');
                results = results.concat(pair);
            }
        }
        return results.join('&');
    }
    _getFilenameFromHeader() {
        let filename = '';
        try {
            if (!this.httpRequest.responseURL.startsWith(this.options.backend)) {
                return '';
            }
            const contentDisposition = this.httpRequest.getResponseHeader('Content-Disposition');
            if (contentDisposition) {
                filename = contentDisposition.match(/filename="(.+)"/)[1];
            }
        }
        catch (error) {
            consoleError('Xhr._getFilenameFromHeader', error);
        }
        return filename;
    }
    _handleResponseData(response) {
        const deferred = new Deferred();
        const filename = this._getFilenameFromHeader();
        const contentType = this.httpRequest.getResponseHeader('Content-Type');
        if (contentType) {
            switch (contentType.split(';')[0]) {
                case 'application/json':
                    if (instanceOf(response, Blob)) {
                        const reader = new FileReader();
                        reader.addEventListener('loadend', (e) => {
                            const data = JSON.parse(e.target.result || 'null');
                            const objekt = new Objekt();
                            objekt.setRaw('raw', data);
                            deferred.resolve([[objekt, filename]]);
                        });
                        reader.readAsText(response);
                    }
                    else {
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
    _setRequestHeaders(urlType, opt_headers = {}) {
        eachObject(opt_headers, (value, key) => {
            if (eq(key, 'responseType')) {
                this.httpRequest.responseType = value;
            }
            else {
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
        if (isUndefined(this._getHeader('Authorization')) &&
            this.authorization) {
            this._setHeader('Authorization', this.authorization);
            this.httpRequest.withCredentials = true;
        }
        if (isUndefined(this._getHeader('X-Requested-With'))) {
            this._setHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }
    _setResponseType(urlType) {
        this.httpRequest.responseType = this._getResponseType(urlType);
    }
    _setHeader(name, value) {
        if (name && value) {
            this.httpRequest.setRequestHeader(name, value);
        }
        this.requestHeaders[name] = value;
    }
    _getHeader(name) {
        return this.requestHeaders[name];
    }
    setBasicAuthorization(username, password) {
        if (username && password) {
            const hash = [username, password].join(':');
            this.authorization = 'Basic ' + encodeBase64(hash);
        }
    }
    setBearerAuthorization(token) {
        if (token) {
            this.authorization = 'Bearer ' + token;
        }
    }
}
