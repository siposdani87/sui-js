import { Promize } from '../core';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
import { Xhr } from './xhr';

export class Http {
    options: Objekt;
    username: string;
    password: string;
    token: string;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            backend: '',
            locale: '',
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.username = null;
        this.password = null;
        this.token = null;
    }

    setBasicAuthorization(username: string, password: string): void {
        this.username = username;
        this.password = password;
    }

    setBearerAuthorization(token: string) {
        this.token = token;
    }

    get(url: string, opt_params?: object, opt_headers?: object) {
        const xhr = this._createXhrRequest();
        return this._getPromise(xhr.get(url, opt_params, opt_headers));
    }

    post(
        url: string,
        opt_data?: object,
        opt_params?: object,
        opt_headers?: object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.post(url, opt_data, opt_params, opt_headers),
        );
    }

    put(
        url: string,
        opt_data?: object,
        opt_params?: object,
        opt_headers?: object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.put(url, opt_data, opt_params, opt_headers),
        );
    }

    patch(
        url: string,
        opt_data?: object,
        opt_params?: object,
        opt_headers?: object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.patch(url, opt_data, opt_params, opt_headers),
        );
    }

    delete(
        url: string,
        opt_data?: object,
        opt_params?: object,
        opt_headers?: object,
    ) {
        const xhr = this._createXhrRequest();
        return this._getPromise(
            xhr.delete(url, opt_data, opt_params, opt_headers),
        );
    }

    private _createXhrRequest(): Xhr {
        const xhr = new Xhr(this.options);
        this.eventBeforeRequest(xhr);
        xhr.setBasicAuthorization(this.username, this.password);
        xhr.setBearerAuthorization(this.token);

        return xhr;
    }

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

    eventBeforeRequest(xhr: Xhr): void {
        consoleDebug('Http.eventBeforeRequest', xhr);
    }

    eventAfterRequest(
        http: XMLHttpRequest,
        response: Objekt,
        filename: string,
    ): void {
        consoleDebug('Http.eventAfterRequest', http, response, filename);
    }
}
