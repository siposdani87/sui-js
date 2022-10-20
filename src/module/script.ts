import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ProgressBar } from './progressBar';
import { Promize } from '../core';

/**
 * @class
 */
export class Script {
    progressBar: ProgressBar;
    options: Objekt;
    head: Knot;
    /**
     * @param {!ProgressBar} progressBar
     * @param {!Object=} opt_options
     */
    constructor(
        progressBar: ProgressBar,
        opt_options: Object | undefined = {},
    ) {
        this.progressBar = progressBar;
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.head = new Query('head').getKnot();
    }
    /**
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_async
     * @param {boolean=} opt_defer
     * @return {!Promize}
     */
    load(
        id: string,
        url: string,
        opt_params?: Object,
        opt_async: boolean | undefined = false,
        opt_defer: boolean | undefined = false,
    ): Promize {
        this.progressBar.show();
        const deferred = new Deferred();
        const script = new Query('#' + id);
        if (script.size() > 0) {
            this.progressBar.hide();
            deferred.resolve();
        } else {
            const node = new Knot('script');
            node.setId(id);
            node.setAttribute('src', urlWithQueryString(url, opt_params));
            // TODO: check there is a good performance solution for script load
            if (opt_async) {
                node.setAttribute('async');
            }
            if (opt_defer) {
                node.setAttribute('defer');
            }

            node.setAttribute('onload', () => {
                this.progressBar.hide();
                deferred.resolve();
            });

            node.setAttribute('onerror', () => {
                this.progressBar.hide();
                deferred.reject();
            });

            this.head.appendChild(node);
        }
        return deferred.promise();
    }
    /**
     * @param {string} id
     * @return {undefined}
     */
    remove(id: string): void {
        const script = new Query('#' + id).getKnot();
        if (!script.isEmpty()) {
            script.remove();
        }
    }
}
