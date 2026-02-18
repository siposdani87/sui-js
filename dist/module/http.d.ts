import { Promize } from '../core';
import { Objekt } from '../core/objekt';
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
 * fresh {@link Xhr} instance, applies the stored credentials, fires the
 * {@link Http.eventBeforeRequest} hook, and returns a
 * {@link Promize}<[{@link Objekt}, string], [{@link Objekt}, string]>.
 *
 * Override {@link Http.eventBeforeRequest} and
 * {@link Http.eventAfterRequest} to add cross-cutting concerns such as
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
 * @category Module
 */
export declare class Http {
    options: Objekt;
    username: string | null;
    password: string | null;
    token: string | null;
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
    constructor(opt_options?: object | undefined);
    /**
     * Merges caller-provided options with sensible defaults into an
     * {@link Objekt} instance stored on `this.options`.
     *
     * @param {object} [opt_options] Raw options to merge.
     */
    private _setOptions;
    /**
     * Resets authentication state. Called once during construction.
     */
    private _init;
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
    setBasicAuthorization(username: string, password: string): void;
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
    setBearerAuthorization(token: string): void;
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
    get(url: string, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
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
    post(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
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
    put(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
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
    patch(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
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
    delete(url: string, opt_data?: object, opt_params?: object, opt_headers?: object): Promize<[Objekt<object>, string], [Objekt<object>, string]>;
    /**
     * Creates a configured {@link Xhr} instance with the current options
     * and authentication credentials applied.
     *
     * @returns {Xhr} A new Xhr instance ready to execute a request.
     */
    private _createXhrRequest;
    /**
     * Wraps the raw {@link Xhr} promise to strip the `XMLHttpRequest`
     * object and fire the {@link Http.eventAfterRequest} hook on both
     * resolution and rejection.
     *
     * @param {Promize} promise The promise returned by an Xhr request method.
     * @returns {Promize<[Objekt, string], [Objekt, string]>} A promise
     *     that resolves or rejects with only the response body and filename.
     */
    private _getPromise;
    /**
     * Called before each request is sent. Override this method to inspect or
     * modify the {@link Xhr} instance (e.g. add custom headers or logging).
     *
     * @param {Xhr} xhr The Xhr instance that will execute the request.
     */
    eventBeforeRequest(xhr: Xhr): void;
    /**
     * Called after each request completes (on both success and failure).
     * Override this method to implement cross-cutting post-request logic
     * such as hiding loading indicators or displaying error notifications.
     *
     * @param {XMLHttpRequest} http The raw XMLHttpRequest object.
     * @param {Objekt} response The parsed response body.
     * @param {string} filename The filename extracted from the
     *     Content-Disposition header, or an empty string.
     */
    eventAfterRequest(http: XMLHttpRequest, response: Objekt, filename: string): void;
}
