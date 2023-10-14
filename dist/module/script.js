import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Script {
    constructor(progressBar, opt_options = {}) {
        this.progressBar = progressBar;
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt();
        this.options.merge(opt_options);
    }
    _init() {
        this.head = new Query('head').getKnot();
    }
    load(id, url, opt_params, opt_async = false, opt_defer = false) {
        this.progressBar.show();
        const deferred = new Deferred();
        const script = new Query('#' + id);
        if (script.size() > 0) {
            this.progressBar.hide();
            deferred.resolve();
        }
        else {
            const scriptKnot = new Knot('script');
            scriptKnot.setId(id);
            scriptKnot.setAttribute('src', urlWithQueryString(url, opt_params));
            // TODO: check there is a good performance solution for script load
            if (opt_async) {
                scriptKnot.setAttribute('async');
            }
            if (opt_defer) {
                scriptKnot.setAttribute('defer');
            }
            scriptKnot.setAttribute('onload', () => {
                this.progressBar.hide();
                deferred.resolve();
            });
            scriptKnot.setAttribute('onerror', () => {
                this.progressBar.hide();
                deferred.reject();
            });
            this.head.appendChild(scriptKnot);
        }
        return deferred.promise();
    }
    remove(id) {
        const script = new Query('#' + id).getKnot();
        if (!script.isEmpty()) {
            script.remove();
        }
    }
}
