import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
import { Xhr } from './xhr';
/**
 * @class
 */
export class Http {
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
    post(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.post(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    put(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.put(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    patch(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.patch(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @param {string} url
     * @param {!Object=} opt_data
     * @param {!Object=} opt_params
     * @param {!Object=} opt_headers
     * @return {!Promize}
     */
    delete(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.delete(url, opt_data, opt_params, opt_headers));
    }
    /**
     * @private
     * @return {!Xhr}
     */
    _createXhrRequest() {
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
     * @param {!Xhr} xhr
     * @return {undefined}
     */
    eventBeforeRequest(xhr) {
        consoleDebug('Http.eventBeforeRequest', xhr);
    }
    /**
     * @param {!XMLHttpRequest} http
     * @param {*} response
     * @return {undefined}
     */
    eventAfterRequest(http, response, filename) {
        consoleDebug('Http.eventAfterRequest', http, response, filename);
    }
}
