import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
/**
 * Tuple describing a content type configuration for a given URL extension.
 * Elements are: [Content-Type header, XMLHttpRequest responseType, Accept header].
 */
type XhrType = [string, XMLHttpRequestResponseType, string];
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
export declare class Xhr {
    options: Objekt<{
        backend: string;
        locale: string;
    }>;
    requestHeaders: {
        [key: string]: string;
    };
    authorization: string | null;
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
    constructor(opt_options?: object | undefined);
    /**
     * Merges caller-provided options with defaults.
     *
     * @param {object} [opt_options] Raw options to merge.
     */
    private _setOptions;
    /**
     * Initializes internal state: request headers, content types,
     * the XMLHttpRequest instance, and the deferred promise.
     */
    private _init;
    /**
     * Registers the built-in content type mappings for json, form, html,
     * svg, and xml.
     */
    private _setTypes;
    /**
     * Stores a content type tuple under the given name.
     *
     * @param {string} name The type identifier (e.g. 'json', 'html').
     * @param {XhrType} value The content type configuration tuple.
     */
    private _setType;
    /**
     * Returns the content type tuple for the given name, falling back to
     * a plain-text wildcard configuration if the name is unrecognized.
     *
     * @param {string} name The type identifier.
     * @returns {XhrType} The content type tuple.
     */
    private _getType;
    /**
     * Returns the Content-Type header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Content-Type header value.
     */
    private _getContentType;
    /**
     * Returns the XMLHttpRequest responseType for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {XMLHttpRequestResponseType} The response type value.
     */
    private _getResponseType;
    /**
     * Returns the Accept header value for the given type name.
     *
     * @param {string} name The type identifier.
     * @returns {string} The Accept header value.
     */
    private _getAccept;
    /**
     * Creates the `onreadystatechange` handler for the XMLHttpRequest.
     * When `readyState` reaches 4 (DONE), the response is parsed via
     * {@link Xhr._handleResponseData} and the deferred is resolved or
     * rejected based on the HTTP status code.
     *
     * @returns {Function} The event handler function.
     */
    private _onReadyStateChange;
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
    get(url: string, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
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
    post(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
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
    put(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
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
    patch(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
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
    delete(url: string, opt_data: object | undefined, opt_params: object | undefined, opt_headers?: object | undefined): import("..").Promize<[XMLHttpRequest, Objekt<object>, string], [XMLHttpRequest, Objekt<object>, string]>;
    /**
     * Builds the full request URL by appending query-string parameters and
     * prepending the backend base URL for root-relative paths.
     *
     * @param {string} url The raw request URL.
     * @param {object} [opt_params] Query-string parameters.
     * @returns {string} The fully qualified URL.
     */
    private _getUrl;
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
    private _createRequest;
    /**
     * Serializes the request body based on the current Content-Type header.
     * JSON content types produce `JSON.stringify()` output; form content
     * types produce URL-encoded key=value pairs.
     *
     * @param {object} [opt_data] The data to serialize.
     * @returns {string} The serialized request body, or an empty string
     *     if no data was provided.
     */
    private _createRequestBody;
    /**
     * Recursively flattens a nested object property into URL-encoded
     * key=value pairs with bracket notation for nested keys and arrays.
     *
     * @param {any} obj The value to parse (object, array, or primitive).
     * @param {string} key The current property key.
     * @param {string} stringKey The accumulated bracket-notation key path.
     * @returns {Array<string>} Flat array of 'key=value' strings.
     */
    private _parseobject;
    /**
     * Serializes a flat or nested object into a URL-encoded query string
     * (without the leading `?`).
     *
     * @param {object} obj The object to serialize.
     * @returns {string} URL-encoded string of key=value pairs joined by `&`.
     */
    private _stringifyobject;
    /**
     * Extracts the filename from the `Content-Disposition` response header.
     * Returns an empty string if the header is absent, unparseable, or the
     * response URL does not belong to the configured backend.
     *
     * @returns {string} The extracted filename, or an empty string.
     */
    private _getFilenameFromHeader;
    /**
     * Parses the raw response into an {@link Objekt} based on the
     * Content-Type response header. JSON responses are merged directly
     * into the Objekt; Blob JSON responses are read via FileReader;
     * all other content types are stored under the `raw` key.
     *
     * @param {any} response The raw XMLHttpRequest response.
     * @returns {Promize} Resolves with a tuple of [Objekt, filename].
     */
    private _handleResponseData;
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
    private _setRequestHeaders;
    /**
     * Sets the XMLHttpRequest responseType based on the URL extension type.
     *
     * @param {string} urlType The URL extension type.
     */
    private _setResponseType;
    /**
     * Sets a request header on the XMLHttpRequest and records it in the
     * internal headers map. Skips the actual `setRequestHeader` call if
     * either the name or value is falsy.
     *
     * @param {string} name The header name.
     * @param {string} value The header value.
     */
    private _setHeader;
    /**
     * Retrieves a previously set request header value from the internal
     * headers map.
     *
     * @param {string} name The header name.
     * @returns {string | null} The header value, or `null` if not set.
     */
    private _getHeader;
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
    setBasicAuthorization(username: string | null, password: string | null): void;
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
    setBearerAuthorization(token: string | null): void;
}
export {};
