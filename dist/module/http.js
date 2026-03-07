import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Emitter } from '../core/emitter';
import { Xhr } from './xhr';
/**
 * High-level HTTP client that wraps {@link Xhr} to provide a simplified
 * request API with built-in authentication management. Http adds an
 * authentication layer (Basic or Bearer) and event hooks on top of the
 * low-level {@link Xhr} transport, stripping the raw `XMLHttpRequest`
 * object from resolved/rejected values so consumers receive only the
 * parsed {@link Objekt} response and an optional filename.
 *
 * Each request method (`get`, `post`, `put`, `patch`, `delete`) creates a
 * fresh {@link Xhr} instance, applies the stored credentials, emits the
 * `'beforeRequest'` event, and returns a
 * {@link Promize}<[{@link Objekt}, string], [{@link Objekt}, string]>.
 *
 * Register handlers with `on('beforeRequest', ...)` and
 * `on('afterRequest', ...)` to add cross-cutting concerns such as
 * loading indicators, error toasts, or request logging.
 *
 * @example
 * const http = new Http({ backend: 'https://api.example.com', locale: 'en' });
 * http.setBearerAuthorization('my-jwt-token');
 *
 * http.get('/users').then(
 *     (response, filename) => console.log(response),
 *     (error, filename) => console.error(error),
 * );
 *
 * @see {@link Xhr}
 * @see {@link Promize}
 * @see {@link Emitter}
 * @category Module
 */
export class Http extends Emitter {
    /**
     * Creates a new Http client instance.
     *
     * @param {object} [opt_options] Configuration merged with defaults.
     * @param {string} [opt_options.backend=''] Base URL prepended to
     *     root-relative request paths.
     * @param {string} [opt_options.locale=''] Accept-Language header value.
     *
     * @example
     * const http = new Http({ backend: '/api/v1', locale: 'hu' });
     */
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges caller-provided options with sensible defaults into an
     * {@link Objekt} instance stored on `this.options`.
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
     * Resets authentication state. Called once during construction.
     */
    _init() {
        this.username = null;
        this.password = null;
        this.token = null;
    }
    /**
     * Stores HTTP Basic authentication credentials. On each subsequent
     * request the credentials are forwarded to the underlying {@link Xhr}
     * instance, which encodes them as a Base64 `Authorization` header.
     *
     * @param {string} username The Basic-auth username.
     * @param {string} password The Basic-auth password.
     *
     * @example
     * http.setBasicAuthorization('admin', 's3cret');
     */
    setBasicAuthorization(username, password) {
        this.username = username;
        this.password = password;
    }
    /**
     * Stores a Bearer token for authentication. On each subsequent request
     * the token is forwarded to the underlying {@link Xhr} instance, which
     * sets the `Authorization: Bearer <token>` header.
     *
     * @param {string} token The bearer token (e.g. a JWT).
     *
     * @example
     * http.setBearerAuthorization('eyJhbGciOiJIUzI1NiIs...');
     */
    setBearerAuthorization(token) {
        this.token = token;
    }
    /**
     * Sends an HTTP GET request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} Resolves with
     *     the parsed response body and filename; rejects on non-200 status.
     *
     * @example
     * http.get('/users', { page: 1 }).then(
     *     (response, filename) => console.log(response),
     * );
     */
    get(url, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.get(url, opt_params, opt_headers));
    }
    /**
     * Sends an HTTP POST request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} Resolves with
     *     the parsed response body and filename; rejects on non-200 status.
     *
     * @example
     * http.post('/users', { name: 'Alice' }).then(
     *     (response, filename) => console.log(response),
     * );
     */
    post(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.post(url, opt_data, opt_params, opt_headers));
    }
    /**
     * Sends an HTTP PUT request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} Resolves with
     *     the parsed response body and filename; rejects on non-200 status.
     *
     * @example
     * http.put('/users/1', { name: 'Alice Updated' }).then(
     *     (response, filename) => console.log(response),
     * );
     */
    put(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.put(url, opt_data, opt_params, opt_headers));
    }
    /**
     * Sends an HTTP PATCH request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload (partial update).
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} Resolves with
     *     the parsed response body and filename; rejects on non-200 status.
     *
     * @example
     * http.patch('/users/1', { email: 'new@example.com' }).then(
     *     (response, filename) => console.log(response),
     * );
     */
    patch(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.patch(url, opt_data, opt_params, opt_headers));
    }
    /**
     * Sends an HTTP DELETE request to the specified URL.
     *
     * @param {string} url Request URL (absolute or root-relative).
     * @param {object} [opt_data] Request body payload.
     * @param {object} [opt_params] Query-string parameters appended to
     *     the URL.
     * @param {object} [opt_headers] Additional request headers.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} Resolves with
     *     the parsed response body and filename; rejects on non-200 status.
     *
     * @example
     * http.delete('/users/1').then(
     *     (response, filename) => console.log(response),
     * );
     */
    delete(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.delete(url, opt_data, opt_params, opt_headers));
    }
    /**
     * Creates a configured {@link Xhr} instance with the current options
     * and authentication credentials applied.
     *
     * @returns {Xhr} A new Xhr instance ready to execute a request.
     */
    _createXhrRequest() {
        const xhr = new Xhr(this.options);
        this.emit('beforeRequest', xhr);
        xhr.setBasicAuthorization(this.username, this.password);
        xhr.setBearerAuthorization(this.token);
        return xhr;
    }
    /**
     * Wraps the raw {@link Xhr} promise to strip the `XMLHttpRequest`
     * object and emit the `'afterRequest'` event on both
     * resolution and rejection.
     *
     * @param {Promize} promise The promise returned by an Xhr request method.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} A promise
     *     that resolves or rejects with only the response body and filename.
     */
    _getPromise(promise) {
        const deferred = new Deferred();
        promise.then((...params) => {
            this.emit('afterRequest', ...params);
            const [, ...rest] = params;
            deferred.resolve(rest);
        }, (...params) => {
            this.emit('afterRequest', ...params);
            const [, ...rest] = params;
            deferred.reject(rest);
        });
        return deferred.promise();
    }
}
