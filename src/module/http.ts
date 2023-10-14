import { Promize } from '../core';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
import { Xhr } from './xhr';

/**
 * @class
 */
export class Http {
    options: Objekt;
    username: string;
    password: string;
    token: string;
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
        this.username = null;
        this.password = null;
        this.token = null;
    }
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username: string, password: string): void {
        this.username = username;
        this.password = password;
    }
    /**
     * @param {string} token
     */
    setBearerAuthorization(token: string) {
        this.token = token;
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url: string, opt_params?: Object, opt_headers?: Object) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.get(url, opt_params, opt_headers));
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
        opt_data?: Object,
        opt_params?: Object,
        opt_headers?: Object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.post(url, opt_data, opt_params, opt_headers),
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
        opt_data?: Object,
        opt_params?: Object,
        opt_headers?: Object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.put(url, opt_data, opt_params, opt_headers),
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
        opt_data?: Object,
        opt_params?: Object,
        opt_headers?: Object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.patch(url, opt_data, opt_params, opt_headers),
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
        opt_data?: Object,
        opt_params?: Object,
        opt_headers?: Object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.delete(url, opt_data, opt_params, opt_headers),
        );
    }
    /**
     * @private
     * @return {!Xhr}
     */
    private _createXhrRequest(): Xhr {
        const xhr = new Xhr(this.options);
        this.eventBeforeRequest(xhr);
        xhr.setBasicAuthorization(this.username, this.password);
        xhr.setBearerAuthorization(this.token);

        return xhr;
    }
    /**
     * @private
     * @param {!Promize} promise
     * @return {!Promize}
     */
    private _getPromise(
        promise: Promize<
            [XMLHttpRequest, Objekt, string],
            [XMLHttpRequest, Objekt, string]
        >,
    ) {
        const deferred = new Deferred<[Objekt, string], [Objekt, string]>();
        promise.then(
            (...params) => {
                this.eventAfterRequest(...params);
                deferred.resolve.apply(deferred, [params.slice(1)]);
            },
            (...params) => {
                this.eventAfterRequest(...params);
                deferred.reject.apply(deferred, [params.slice(1)]);
            },
        );
        return deferred.promise();
    }
    /**
     * @param {!Xhr} xhr
     * @return {undefined}
     */
    eventBeforeRequest(xhr: Xhr): void {
        consoleDebug('Http.eventBeforeRequest', xhr);
    }
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(
        http: XMLHttpRequest,
        response: Objekt,
        filename: string,
    ): void {
        consoleDebug('Http.eventAfterRequest', http, response, filename);
    }
}
