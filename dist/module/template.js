import { contain } from '../utils/operation';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleError } from '../utils/log';
/**
 * @class
 */
export class Template {
    /**
     * @param {!Http} http
     * @param {!Object=} opt_options
     */
    constructor(http, opt_options = {}) {
        this.http = http;
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
            selector: '.template-view',
            locale: navigator.language,
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.viewKnot = new Query(this.options.selector).getKnot();
    }
    /**
     * @return {!Knot}
     */
    getViewKnot() {
        return this.viewKnot;
    }
    /**
     * @param {string} url
     * @param {boolean=} opt_force
     * @return {!Promize}
     */
    load(url, opt_force = false) {
        const deferred = new Deferred();
        const templateUrl = this.viewKnot.getAttribute('data-template-url');
        const locale = this.viewKnot.getAttribute('data-locale');
        if (!opt_force &&
            contain(this.options.locale, locale) &&
            contain(url, templateUrl)) {
            this.viewKnot.removeAttribute('data-locale');
            const knot = new Query('.page-content', this.viewKnot).getKnot();
            deferred.resolve(knot);
        }
        else {
            this.viewKnot.setAttribute('data-template-url', url);
            this.http.get(url).then((data) => {
                deferred.resolve(this._spaNavigate(data, false));
            }, (data) => {
                deferred.reject(this._spaNavigate(data, true));
            });
        }
        return deferred.promise();
    }
    _spaNavigate(data, isError) {
        // Fallback for browsers that don't support this API:
        /* if (!document.startViewTransition) {
            this._updateDOM(data, isError);
          return;
        } */
        // With a transition:
        // document.startViewTransition(() => this._updateDOM(data, isError));
        this._updateDOM(data, isError);
    }
    /**
     * @private
     * @param {!Knot} data
     * @param {boolean} isError
     * @return {!Knot}
     */
    _updateDOM(data, isError) {
        const knot = new Query('.page-content', data).getKnot();
        if (isError) {
            const messageKnot = new Query('.message', knot).getKnot();
            const message = {
                content: messageKnot.getText(),
                type: messageKnot.getAttribute('class').split(' ')[1],
            };
            this.eventError(message);
        }
        else {
            this.viewKnot.insert(knot);
        }
        return knot;
    }
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    eventError(message) {
        consoleError('Template.eventError()', message);
    }
}
