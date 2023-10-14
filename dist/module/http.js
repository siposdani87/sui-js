import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
import { Xhr } from './xhr';
export class Http {
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
        this.username = null;
        this.password = null;
        this.token = null;
    }
    setBasicAuthorization(username, password) {
        this.username = username;
        this.password = password;
    }
    setBearerAuthorization(token) {
        this.token = token;
    }
    get(url, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.get(url, opt_params, opt_headers));
    }
    post(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.post(url, opt_data, opt_params, opt_headers));
    }
    put(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.put(url, opt_data, opt_params, opt_headers));
    }
    patch(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.patch(url, opt_data, opt_params, opt_headers));
    }
    delete(url, opt_data, opt_params, opt_headers) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.delete(url, opt_data, opt_params, opt_headers));
    }
    _createXhrRequest() {
        const xhr = new Xhr(this.options);
        this.eventBeforeRequest(xhr);
        xhr.setBasicAuthorization(this.username, this.password);
        xhr.setBearerAuthorization(this.token);
        return xhr;
    }
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
    eventBeforeRequest(xhr) {
        consoleDebug('Http.eventBeforeRequest', xhr);
    }
    eventAfterRequest(http, response, filename) {
        consoleDebug('Http.eventAfterRequest', http, response, filename);
    }
}
