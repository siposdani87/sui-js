import { urlWithQueryString } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Style {
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
    load(id, url, opt_params, opt_rel = 'stylesheet', opt_media = 'all') {
        this.progressBar.show();
        const deferred = new Deferred();
        const style = new Query('#' + id);
        if (style.size() > 0) {
            this.progressBar.hide();
            deferred.resolve(true);
        }
        else {
            const linkKnot = new Knot('link');
            linkKnot.setId(id);
            linkKnot.setAttribute('href', urlWithQueryString(url, opt_params));
            linkKnot.setAttribute('rel', opt_rel);
            linkKnot.setAttribute('media', opt_media);
            linkKnot.setAttribute('onload', () => {
                this.progressBar.hide();
                deferred.resolve(true);
            });
            linkKnot.setAttribute('onerror', () => {
                this.progressBar.hide();
                deferred.reject(false);
            });
            this.head.appendChild(linkKnot);
        }
        return deferred.promise();
    }
    remove(id) {
        const style = new Query('#' + id).getKnot();
        if (!style.isEmpty()) {
            style.remove();
        }
    }
}
