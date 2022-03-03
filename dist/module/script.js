import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class Script {
    progressBar;
    options;
    head;
    /**
     * @param {!ProgressBar} progressBar
     * @param {!Object=} opt_options
     */
    constructor(progressBar, opt_options = {}) {
        this.progressBar = progressBar;
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
        _self.options = new Objekt();
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.head = new Query('head').getItem();
    }
    /**
     * @param {string} id
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_async
     * @param {boolean=} opt_defer
     * @return {!Promize}
     */
    load(id, url, opt_params, opt_async = false, opt_defer = false) {
        this.progressBar.show();
        const deferred = new Deferred();
        const script = new Query('#' + id);
        if (script.size() > 0) {
            this.progressBar.hide();
            deferred.resolve();
        }
        else {
            const node = new Item('script');
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
    remove(id) {
        const script = new Query('#' + id).getItem();
        if (!script.isEmpty()) {
            script.remove();
        }
    }
}
