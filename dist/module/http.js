import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';
import { Xhr } from './xhr';
/**
 * @class
 */
export class Http {
    options;
    username;
    password;
    token;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({
            backend: '',
            locale: '',
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.username = null;
        this.password = null;
        this.token = null;
    }
    /**
     * @param {string} username
     * @param {string} password
     * @return {undefined}
     */
    setBasicAuthorization(username, password) {
        this.username = username;
        this.password = password;
    }
    /**
     * @param {string} token
     */
    setBearerAuthorization(token) {
        this.token = token;
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    get(url, opt_params, opt_headers) {
        const http = this._getRequestHandler();
        return this._getPromise(http.get(url, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    post(url, opt_data, opt_params, opt_headers) {
        const http = this._getRequestHandler();
        return this._getPromise(http.post(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url, opt_data, opt_params, opt_headers) {
        const http = this._getRequestHandler();
        return this._getPromise(http.put(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url, opt_data, opt_params, opt_headers) {
        const http = this._getRequestHandler();
        return this._getPromise(http.patch(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url, opt_data, opt_params, opt_headers) {
        const http = this._getRequestHandler();
        return this._getPromise(http.delete(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @private
     * @return {!Xhr}
     */
    _getRequestHandler() {
        const http = new Xhr(this.options);
        this.eventBeforeRequest(http);
        http.setBasicAuthorization(this.username, this.password);
        http.setBearerAuthorization(this.token);
        return http;
    }
    /**
     * @private
     * @param {!Promize} promise
     * @return {!Promize}
     */
    _getPromise(promise) {
        const deferred = new Deferred();
        promise.then((...params) => {
            this.eventAfterRequest(...params);
            deferred.resolve.apply(deferred, [params.slice(1)]);
        }, (...params) => {
            this.eventAfterRequest(...params);
            deferred.reject.apply(deferred, [params.slice(1)]);
        });
        return deferred.promise();
    }
    /**
     * @param {!Xhr} http
     * @return {undefined}
     */
    eventBeforeRequest(http) {
        consoleWarn('Http.eventBeforeRequest', http);
    }
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(http, response) {
        consoleWarn('Http.eventAfterRequest', http, response);
    }
}
