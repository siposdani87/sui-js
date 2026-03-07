import {
    getExtensionName,
    eachObject,
    isUndefined,
    urlWithQueryString,
} from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleError } from '../utils/log';
import { encodeBase64 } from '../utils/coder';

/**
 * Metadata about a completed HTTP response, providing status,
 * headers, and URL information to consumers.
 *
 * @category Module
 */
export type HttpResponse = {
    /** The HTTP status code (e.g. 200, 404, 500). */
    status: number;
    /** The HTTP status text (e.g. "OK", "Not Found"). */
    statusText: string;
    /** The final URL after any redirects. */
    url: string;
    /** Selected response headers as a flat key-value map. */
    headers: Record<string, string>;
};

/**
 * Tuple describing a content type configuration for a given URL extension.
 * Elements are: [Content-Type header, Accept header].
 */
type XhrType = [string, string];

/**
 * Low-level fetch API wrapper that manages content-type detection,
 * request headers, authentication, and response parsing. Each instance
 * handles exactly one HTTP request; create a new Xhr for each call.
 *
 * Content types are auto-detected from the URL file extension. Built-in
 * types include `json`, `form`, `html`, `svg`, and `xml`. Unknown
 * extensions default to plain text with a wildcard Accept header.
 *
 * The response is always parsed into an {@link Objekt}. JSON responses
 * are merged directly; all other content types (HTML, SVG, XML, text)
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
 *     (httpResponse, response, filename) => console.log(response),
 *     (httpResponse, error, filename) => console.error(error),
 * );
 *
 * @see {@link Http}
 * @see {@link Objekt}
 * @category Module
 */
export class Xhr {
    options!: Objekt<{ backend: string; locale: string }>;
    requestHeaders!: {
        [key: string]: string;
    };
    authorization!: string | null;
    types!: {
        [key: string]: XhrType;
    };
    deferred!: Deferred<
        [HttpResponse, Objekt, string],
        [HttpResponse, Objekt, string]
    >;

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
    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Merges caller-provided options with defaults.
     *
     * @param {object} [opt_options] Raw options to merge.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }

    /**
     * Initializes internal state: request headers, content types,
     * and the deferred promise.
     */
    private _init(): void {
        this.requestHeaders = {};
        this.authorization = null;
        this.types = {};

        this._setTypes();

        this.deferred = new Deferred();
    }

    /**
     * Registers the built-in content type mappings for json, form, html,
     * svg, and xml.
     */
    private _setTypes(): void {
        this._setType('json', ['application/json', 'application/json']);
        this._setType('form', [
            'application/x-www-form-urlencoded',
            'application/json',
        ]);

        this._setType('html', ['', 'text/html']);
        this._setType('svg', ['', 'image/svg-xml']);
        this._setType('xml', ['', 'application/xml']);
    }

    /**
     * Stores a content type tuple under the given name.
     *
     * @param {string} name The type identifier (e.g. 'json', 'html').
     * @param {XhrType} value The content type configuration tuple.
     */
    private _setType(name: string, value: XhrType): void {
        this.types[name] = value;
    }

    /**
     * Returns the content type tuple for the given name, falling back to
     * a plain-text wildcard configuration if the name is unrecognized.
     *
     * @param {string} name The type identifier.
     * @returns {XhrType} The content type tuple.
     */
    private _getType(name: string): XhrType {
        return this.types[name] || ['', '*/*'];
    }

    /**
     * Returns the Content-Type header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Content-Type header value.
     */
    private _getContentType(name: string): string {
        return this._getType(name)[0];
    }

    /**
     * Returns the Accept header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Accept header value.
     */
    private _getAccept(name: string): string {
        return this._getType(name)[1];
    }

    /**
     * Sends an HTTP GET request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[HttpResponse, Objekt, string], [HttpResponse, Objekt, string]>}
     *     Resolves on 2xx status; rejects otherwise.
     *
     * @example
     * xhr.get('/users.json', { page: 2 }).then(
     *     (httpResponse, response, filename) => console.log(response),
     * );
     */
    get(
        url: string,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        return this._createRequest('GET', url, undefined, opt_params, opt_headers);
    }

    /**
     * Sends an HTTP POST request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[HttpResponse, Objekt, string], [HttpResponse, Objekt, string]>}
     *     Resolves on 2xx status; rejects otherwise.
     */
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

    /**
     * Sends an HTTP PUT request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[HttpResponse, Objekt, string], [HttpResponse, Objekt, string]>}
     *     Resolves on 2xx status; rejects otherwise.
     */
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

    /**
     * Sends an HTTP PATCH request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload (partial update).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[HttpResponse, Objekt, string], [HttpResponse, Objekt, string]>}
     *     Resolves on 2xx status; rejects otherwise.
     */
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

    /**
     * Sends an HTTP DELETE request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[HttpResponse, Objekt, string], [HttpResponse, Objekt, string]>}
     *     Resolves on 2xx status; rejects otherwise.
     */
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

    /**
     * Builds the full request URL by appending query-string parameters and
     * prepending the backend base URL for root-relative paths.
     *
     * @param {string} url The raw request URL.
     * @param {object} [opt_params] Query-string parameters.
     * @returns {string} The fully qualified URL.
     */
    private _getUrl(url: string, opt_params: object | undefined): string {
        const uri = urlWithQueryString(url, opt_params);
        return url[0] === '/' ? this.options.backend + uri : uri;
    }

    /**
     * Builds the fetch RequestInit, calls fetch, and handles the response.
     *
     * @param {string} method The HTTP method (GET, POST, PUT, PATCH, DELETE).
     * @param {string} url The request URL.
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize} The deferred promise for this request.
     */
    private _createRequest(
        method: string,
        url: string,
        opt_data: object | undefined,
        opt_params: object | undefined,
        opt_headers: object | undefined = {},
    ) {
        const fullUrl = this._getUrl(url, opt_params);
        const urlType = getExtensionName(url);
        this._setRequestHeaders(urlType, opt_headers);

        const headers: Record<string, string> = {};
        for (const [key, value] of Object.entries(this.requestHeaders)) {
            if (key && value) {
                headers[key] = value;
            }
        }

        const init: RequestInit = {
            method,
            headers,
        };

        if (this.authorization) {
            init.credentials = 'include';
        }

        if (method !== 'GET' && method !== 'HEAD') {
            init.body = this._createRequestBody(opt_data);
        }

        this._executeFetch(fullUrl, init);

        return this.deferred.promise();
    }

    /**
     * Executes the fetch call and pipes the result to the deferred.
     *
     * @param {string} url The fully qualified URL.
     * @param {RequestInit} init The fetch init options.
     */
    private async _executeFetch(url: string, init: RequestInit): Promise<void> {
        try {
            const response = await fetch(url, init);
            const httpResponse = this._buildHttpResponse(response);
            const [objekt, filename] = await this._handleFetchResponse(response);

            if (response.ok) {
                this.deferred.resolve([httpResponse, objekt, filename]);
            } else {
                this.deferred.reject([httpResponse, objekt, filename]);
            }
        } catch (_error) {
            const httpResponse: HttpResponse = {
                status: 0,
                statusText: 'Network Error',
                url,
                headers: {},
            };
            const objekt = new Objekt();
            this.deferred.reject([httpResponse, objekt, '']);
        }
    }

    /**
     * Builds an HttpResponse from a fetch Response object.
     *
     * @param {Response} response The fetch Response.
     * @returns {HttpResponse} The HttpResponse metadata.
     */
    private _buildHttpResponse(response: Response): HttpResponse {
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            headers,
        };
    }

    /**
     * Parses the fetch response body based on Content-Type and extracts
     * the filename from the Content-Disposition header.
     *
     * @param {Response} response The fetch Response.
     * @returns {Promise<[Objekt, string]>} The parsed response data and filename.
     */
    private async _handleFetchResponse(
        response: Response,
    ): Promise<[Objekt, string]> {
        const filename = this._getFilenameFromHeader(
            response.headers,
            response.url,
        );
        const contentType = response.headers.get('Content-Type');

        if (contentType) {
            const mimeType = contentType.split(';')[0];
            if (mimeType === 'application/json') {
                const text = await response.text();
                const data = JSON.parse(text || 'null');
                const objekt = new Objekt();
                objekt.merge(data);
                return [objekt, filename];
            }
        }

        const text = await response.text();
        const objekt = new Objekt();
        objekt.setRaw('raw', text);
        return [objekt, filename];
    }

    /**
     * Serializes the request body based on the current Content-Type header.
     *
     * @param {object} [opt_data] The data to serialize.
     * @returns {string} The serialized request body, or an empty string
     *     if no data was provided.
     */
    private _createRequestBody(opt_data?: object): string {
        let result = '';
        if (opt_data) {
            switch (this._getHeader('Content-Type')) {
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
     * Recursively flattens a nested object property into URL-encoded
     * key=value pairs with bracket notation for nested keys and arrays.
     *
     * @param {any} obj The value to parse (object, array, or primitive).
     * @param {string} key The current property key.
     * @param {string} stringKey The accumulated bracket-notation key path.
     * @returns {Array<string>} Flat array of 'key=value' strings.
     */
    private _parseObject(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                if (Object.hasOwn(obj, j)) {
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
     * Serializes a flat or nested object into a URL-encoded query string
     * (without the leading `?`).
     *
     * @param {object} obj The object to serialize.
     * @returns {string} URL-encoded string of key=value pairs joined by `&`.
     */
    private _stringifyObject(obj: object): string {
        let results: string[] = [];
        for (const key in obj) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (Object.hasOwn(obj as Record<string, any>, key)) {
                const pair = this._parseObject(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (obj as Record<string, any>)[key],
                    key,
                    '',
                );
                results = results.concat(pair);
            }
        }
        return results.join('&');
    }

    /**
     * Extracts the filename from the `Content-Disposition` response header.
     *
     * @param {Headers} headers The response headers.
     * @param {string} responseUrl The response URL.
     * @returns {string} The extracted filename, or an empty string.
     */
    private _getFilenameFromHeader(headers: Headers, responseUrl: string): string {
        let filename = '';

        try {
            if (!responseUrl.startsWith(this.options.backend)) {
                return '';
            }
            const contentDisposition = headers.get('Content-Disposition');
            if (contentDisposition) {
                filename = contentDisposition.match(/filename="(.+)"/)![1]!;
            }
        } catch (error) {
            consoleError('Xhr._getFilenameFromHeader', error);
        }
        return filename;
    }

    /**
     * Populates the internal request headers map with defaults and
     * caller-provided overrides.
     *
     * @param {string} urlType The URL extension type used to look up
     *     default Accept and Content-Type values.
     * @param {object} [opt_headers] Caller-provided headers to apply first.
     */
    private _setRequestHeaders(
        urlType: string,
        opt_headers: object | undefined = {},
    ): void {
        eachObject(opt_headers, (value, key) => {
            this._setHeader(key, value);
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
        }
        if (isUndefined(this._getHeader('X-Requested-With'))) {
            this._setHeader('X-Requested-With', 'XMLHttpRequest');
        }
    }

    /**
     * Records a request header in the internal headers map.
     *
     * @param {string} name The header name.
     * @param {string} value The header value.
     */
    private _setHeader(name: string, value: string): void {
        this.requestHeaders[name] = value;
    }

    /**
     * Retrieves a previously set request header value from the internal
     * headers map.
     *
     * @param {string} name The header name.
     * @returns {string | undefined} The header value, or `undefined` if not set.
     */
    private _getHeader(name: string): string | undefined {
        return this.requestHeaders[name];
    }

    /**
     * Sets HTTP Basic authentication credentials.
     *
     * @param {string | null} username The Basic-auth username.
     * @param {string | null} password The Basic-auth password.
     *
     * @example
     * xhr.setBasicAuthorization('admin', 's3cret');
     */
    setBasicAuthorization(
        username: string | null,
        password: string | null,
    ): void {
        if (username && password) {
            const hash = [username, password].join(':');
            this.authorization = 'Basic ' + encodeBase64(hash);
        }
    }

    /**
     * Sets a Bearer token for authentication.
     *
     * @param {string | null} token The bearer token (e.g. a JWT).
     *
     * @example
     * xhr.setBearerAuthorization('eyJhbGciOiJIUzI1NiIs...');
     */
    setBearerAuthorization(token: string | null): void {
        if (token) {
            this.authorization = 'Bearer ' + token;
        }
    }
}
