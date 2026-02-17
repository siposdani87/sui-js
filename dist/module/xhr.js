import { eq, getExtensionName, instanceOf, isString, eachObject, isUndefined, urlWithQueryString, } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleError, consoleWarn } from '../utils/log';
import { encodeBase64 } from '../utils/coder';
/**
 * Low-level XMLHttpRequest wrapper that manages content-type detection,
 * request headers, authentication, and response parsing. Each instance
 * handles exactly one HTTP request; create a new Xhr for each call.
 *
 * Content types are auto-detected from the URL file extension. Built-in
 * types include `json`, `form`, `html`, `svg`, and `xml`. Unknown
 * extensions default to plain text with a wildcard Accept header.
 *
 * The response is always parsed into an {@link Objekt}. JSON responses
 * are merged directly; all other content types (HTML, SVG, XML, Blob)
 * are stored under the `raw` key via `setRaw()`.
 *
 * Authentication is set via {@link Xhr.setBasicAuthorization} (HTTP Basic)
 * or {@link Xhr.setBearerAuthorization} (Bearer token). These must be
 * called before one of the request methods.
 *
 * @example
 * const xhr = new Xhr({ backend: 'https://api.example.com', locale: 'en' });
 * xhr.setBearerAuthorization('my-jwt-token');
 *
 * xhr.get('/users.json', { page: 1 }).then(
 *     (httpRequest, response, filename) => console.log(response),
 *     (httpRequest, error, filename) => console.error(error),
 * );
 *
 * @see {@link Http}
 * @see {@link Objekt}
 * @category Module
 */
export class Xhr {
    /**
     * Creates a new Xhr instance configured with the given options.
     *
     * @param {object} [opt_options] Configuration merged with defaults.
     * @param {string} [opt_options.backend=''] Base URL prepended to
     *     root-relative request paths (paths starting with `/`).
     * @param {string} [opt_options.locale=''] Value for the
     *     Accept-Language request header.
     *
     * @example
     * const xhr = new Xhr({ backend: '/api', locale: 'hu' });
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges caller-provided options with defaults.
     *
     * @param {object} [opt_options] Raw options to merge.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }
    /**
     * Initializes internal state: request headers, content types,
     * the XMLHttpRequest instance, and the deferred promise.
     */
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
    /**
     * Registers the built-in content type mappings for json, form, html,
     * svg, and xml.
     */
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
    /**
     * Stores a content type tuple under the given name.
     *
     * @param {string} name The type identifier (e.g. 'json', 'html').
     * @param {XhrType} value The content type configuration tuple.
     */
    _setType(name, value) {
        this.types[name] = value;
    }
    /**
     * Returns the content type tuple for the given name, falling back to
     * a plain-text wildcard configuration if the name is unrecognized.
     *
     * @param {string} name The type identifier.
     * @returns {XhrType} The content type tuple.
     */
    _getType(name) {
        return this.types[name] || ['', 'text', '*/*'];
    }
    /**
     * Returns the Content-Type header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Content-Type header value.
     */
    _getContentType(name) {
        return this._getType(name)[0];
    }
    /**
     * Returns the XMLHttpRequest responseType for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {XMLHttpRequestResponseType} The response type value.
     */
    _getResponseType(name) {
        return this._getType(name)[1];
    }
    /**
     * Returns the Accept header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Accept header value.
     */
    _getAccept(name) {
        return this._getType(name)[2];
    }
    /**
     * Creates the `onreadystatechange` handler for the XMLHttpRequest.
     * When `readyState` reaches 4 (DONE), the response is parsed via
     * {@link Xhr._handleResponseData} and the deferred is resolved or
     * rejected based on the HTTP status code.
     *
     * @returns {Function} The event handler function.
     */
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
    /**
     * Sends an HTTP GET request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[XMLHttpRequest, Objekt, string], [XMLHttpRequest, Objekt, string]>}
     *     Resolves with the raw request, parsed response, and filename;
     *     rejects on non-200 status.
     *
     * @example
     * xhr.get('/users.json', { page: 2 }).then(
     *     (httpRequest, response, filename) => console.log(response),
     * );
     */
    get(url, opt_params, opt_headers = {}) {
        return this._createRequest('GET', url, {}, opt_params, opt_headers);
    }
    /**
     * Sends an HTTP POST request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[XMLHttpRequest, Objekt, string], [XMLHttpRequest, Objekt, string]>}
     *     Resolves with the raw request, parsed response, and filename;
     *     rejects on non-200 status.
     *
     * @example
     * xhr.post('/users.json', { name: 'Alice' }).then(
     *     (httpRequest, response, filename) => console.log(response),
     * );
     */
    post(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('POST', url, opt_data, opt_params, opt_headers);
    }
    /**
     * Sends an HTTP PUT request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[XMLHttpRequest, Objekt, string], [XMLHttpRequest, Objekt, string]>}
     *     Resolves with the raw request, parsed response, and filename;
     *     rejects on non-200 status.
     *
     * @example
     * xhr.put('/users/1.json', { name: 'Alice Updated' }).then(
     *     (httpRequest, response, filename) => console.log(response),
     * );
     */
    put(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('PUT', url, opt_data, opt_params, opt_headers);
    }
    /**
     * Sends an HTTP PATCH request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload (partial update).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[XMLHttpRequest, Objekt, string], [XMLHttpRequest, Objekt, string]>}
     *     Resolves with the raw request, parsed response, and filename;
     *     rejects on non-200 status.
     *
     * @example
     * xhr.patch('/users/1.json', { email: 'new@example.com' }).then(
     *     (httpRequest, response, filename) => console.log(response),
     * );
     */
    patch(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('PATCH', url, opt_data, opt_params, opt_headers);
    }
    /**
     * Sends an HTTP DELETE request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[XMLHttpRequest, Objekt, string], [XMLHttpRequest, Objekt, string]>}
     *     Resolves with the raw request, parsed response, and filename;
     *     rejects on non-200 status.
     *
     * @example
     * xhr.delete('/users/1.json').then(
     *     (httpRequest, response, filename) => console.log(response),
     * );
     */
    delete(url, opt_data, opt_params, opt_headers = {}) {
        return this._createRequest('DELETE', url, opt_data, opt_params, opt_headers);
    }
    /**
     * Builds the full request URL by appending query-string parameters and
     * prepending the backend base URL for root-relative paths.
     *
     * @param {string} url The raw request URL.
     * @param {object} [opt_params] Query-string parameters.
     * @returns {string} The fully qualified URL.
     */
    _getUrl(url, opt_params) {
        const uri = urlWithQueryString(url, opt_params);
        return url[0] === '/' ? this.options.backend + uri : uri;
    }
    /**
     * Opens the XMLHttpRequest, sets response type and request headers,
     * serializes the body, and sends the request.
     *
     * @param {string} type The HTTP method (GET, POST, PUT, PATCH, DELETE).
     * @param {string} url The request URL.
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize} The deferred promise for this request.
     */
    _createRequest(type, url, opt_data, opt_params, opt_headers = {}) {
        this.httpRequest.open(type, this._getUrl(url, opt_params), true);
        const urlType = getExtensionName(url);
        this._setResponseType(urlType);
        this._setRequestHeaders(urlType, opt_headers);
        this.httpRequest.send(this._createRequestBody(opt_data));
        return this.deferred.promise();
    }
    /**
     * Serializes the request body based on the current Content-Type header.
     * JSON content types produce `JSON.stringify()` output; form content
     * types produce URL-encoded key=value pairs.
     *
     * @param {object} [opt_data] The data to serialize.
     * @returns {string} The serialized request body, or an empty string
     *     if no data was provided.
     */
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
    /**
     * Recursively flattens a nested object property into URL-encoded
     * key=value pairs with bracket notation for nested keys and arrays.
     *
     * @param {any} obj The value to parse (object, array, or primitive).
     * @param {string} key The current property key.
     * @param {string} stringKey The accumulated bracket-notation key path.
     * @returns {Array<string>} Flat array of 'key=value' strings.
     */
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
    /**
     * Serializes a flat or nested object into a URL-encoded query string
     * (without the leading `?`).
     *
     * @param {object} obj The object to serialize.
     * @returns {string} URL-encoded string of key=value pairs joined by `&`.
     */
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
    /**
     * Extracts the filename from the `Content-Disposition` response header.
     * Returns an empty string if the header is absent, unparseable, or the
     * response URL does not belong to the configured backend.
     *
     * @returns {string} The extracted filename, or an empty string.
     */
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
    /**
     * Parses the raw response into an {@link Objekt} based on the
     * Content-Type response header. JSON responses are merged directly
     * into the Objekt; Blob JSON responses are read via FileReader;
     * all other content types are stored under the `raw` key.
     *
     * @param {any} response The raw XMLHttpRequest response.
     * @returns {Promize} Resolves with a tuple of [Objekt, filename].
     */
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
    /**
     * Applies default and caller-provided request headers to the
     * XMLHttpRequest. Sets Accept, Accept-Language, Content-Type,
     * Authorization, and X-Requested-With headers when not already
     * provided by the caller.
     *
     * @param {string} urlType The URL extension type used to look up
     *     default Accept and Content-Type values.
     * @param {object} [opt_headers] Caller-provided headers to apply first.
     */
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
    /**
     * Sets the XMLHttpRequest responseType based on the URL extension type.
     *
     * @param {string} urlType The URL extension type.
     */
    _setResponseType(urlType) {
        this.httpRequest.responseType = this._getResponseType(urlType);
    }
    /**
     * Sets a request header on the XMLHttpRequest and records it in the
     * internal headers map. Skips the actual `setRequestHeader` call if
     * either the name or value is falsy.
     *
     * @param {string} name The header name.
     * @param {string} value The header value.
     */
    _setHeader(name, value) {
        if (name && value) {
            this.httpRequest.setRequestHeader(name, value);
        }
        this.requestHeaders[name] = value;
    }
    /**
     * Retrieves a previously set request header value from the internal
     * headers map.
     *
     * @param {string} name The header name.
     * @returns {string | null} The header value, or `null` if not set.
     */
    _getHeader(name) {
        return this.requestHeaders[name];
    }
    /**
     * Sets HTTP Basic authentication credentials. The username and password
     * are Base64-encoded into an `Authorization: Basic <hash>` header value
     * applied when the request headers are set. Both values must be
     * non-null for the authorization to take effect.
     *
     * @param {string | null} username The Basic-auth username.
     * @param {string | null} password The Basic-auth password.
     *
     * @example
     * xhr.setBasicAuthorization('admin', 's3cret');
     */
    setBasicAuthorization(username, password) {
        if (username && password) {
            const hash = [username, password].join(':');
            this.authorization = 'Basic ' + encodeBase64(hash);
        }
    }
    /**
     * Sets a Bearer token for authentication. The token is stored as an
     * `Authorization: Bearer <token>` header value applied when the
     * request headers are set. The token must be non-null for the
     * authorization to take effect.
     *
     * @param {string | null} token The bearer token (e.g. a JWT).
     *
     * @example
     * xhr.setBearerAuthorization('eyJhbGciOiJIUzI1NiIs...');
     */
    setBearerAuthorization(token) {
        if (token) {
            this.authorization = 'Bearer ' + token;
        }
    }
}
